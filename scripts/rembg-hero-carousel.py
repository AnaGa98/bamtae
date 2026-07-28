#!/usr/bin/env python3
"""
High-quality hero carousel cutouts:
  - isnet-general-use at ≥ original resolution (2× upscale for inference/matting)
  - morphological mask cleanup + hole fill
  - light alpha antialias + color decontamination
  - red mask overlay controls for review
"""

from __future__ import annotations

import io
import os
import sys
from pathlib import Path

os.environ.setdefault("NUMBA_CACHE_DIR", "/tmp/numba_cache")

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = ROOT / "public" / "products"
OUT = ROOT / "public" / "hero"
CONTROLS = OUT / "controls"

SOURCES = {
    1: "carrousel1.jpeg",
    2: "carrousel2.jpeg",
    3: "carrousel3.png",
    5: "carrousel5.png",
    7: "carrousel7.png",
}

BG_REF = np.array([241.0, 241.0, 241.0], dtype=np.float64)
UPSCALE = 2.0  # segment/matte larger than source; downscale after clean cut


def estimate_background(rgb: np.ndarray) -> np.ndarray:
    border = np.concatenate(
        [
            rgb[0, :, :].reshape(-1, 3),
            rgb[-1, :, :].reshape(-1, 3),
            rgb[:, 0, :].reshape(-1, 3),
            rgb[:, -1, :].reshape(-1, 3),
        ],
        axis=0,
    ).astype(np.float64)
    diff = np.max(border, axis=1) - np.min(border, axis=1)
    lum = border.mean(axis=1)
    mask = (diff < 20) & (lum > 160)
    if mask.sum() < 50:
        return BG_REF.copy()
    return border[mask].mean(axis=0)


def keep_significant_components(binary: np.ndarray, min_area_frac: float = 0.01) -> np.ndarray:
    """Drop speckles; keep every large blob (multi-person shots need >1)."""
    labeled, n = ndi.label(binary)
    if n == 0:
        return binary
    counts = np.bincount(labeled.ravel())
    counts[0] = 0
    min_area = max(64, int(binary.size * min_area_frac))
    keep_ids = np.where(counts >= min_area)[0]
    if keep_ids.size == 0:
        keep_ids = np.array([counts.argmax()])
    return np.isin(labeled, keep_ids)


def fill_small_holes(binary: np.ndarray, max_hole_frac: float = 0.008) -> np.ndarray:
    """Fill small interior holes (wrists/jewelry) without closing arm–torso gaps."""
    filled = ndi.binary_fill_holes(binary)
    holes = filled & ~binary
    if not np.any(holes):
        return binary
    labeled, n = ndi.label(holes)
    if n == 0:
        return binary
    counts = np.bincount(labeled.ravel())
    counts[0] = 0  # never treat label 0 as a hole to fill
    max_hole = max(32, int(binary.size * max_hole_frac))
    small_ids = np.where((counts > 0) & (counts <= max_hole))[0]
    if small_ids.size == 0:
        return binary
    return binary | np.isin(labeled, small_ids)


def clean_mask(mask_u8: np.ndarray) -> np.ndarray:
    """
    Morphological cleanup:
      - opening removes speckles (pixel noise around hair)
      - modest closing bridges tiny gaps (jewelry)
      - keep all significant components (not only the largest)
      - fill only small holes (wrists), preserve large negative spaces
    """
    soft = mask_u8.astype(np.float32) / 255.0
    binary = soft >= 0.42

    # opening: kill isolated dots
    binary = ndi.binary_opening(binary, structure=np.ones((3, 3)))
    # modest closing for bracelet-scale gaps — avoid filling arm pits
    binary = ndi.binary_closing(binary, structure=np.ones((5, 5)))

    binary = keep_significant_components(binary, min_area_frac=0.008)
    binary = fill_small_holes(binary, max_hole_frac=0.006)

    # reclaim fine hair tips near silhouette without bloating
    binary = ndi.binary_dilation(binary, structure=np.ones((2, 2)))

    core = ndi.binary_erosion(binary, structure=np.ones((5, 5)))
    dist_in = ndi.distance_transform_edt(binary)
    dist_out = ndi.distance_transform_edt(~binary)
    band = 2.5
    alpha = np.zeros_like(soft, dtype=np.float32)
    alpha[binary] = np.clip(dist_in[binary] / band, 0, 1)
    alpha[core] = 1.0

    near = (~binary) & (dist_out <= 3) & (soft > 0.4)
    alpha[near] = np.maximum(alpha[near], soft[near] * 0.9)

    return np.clip(alpha * 255.0, 0, 255).astype(np.uint8)


def antialias_alpha(alpha_u8: np.ndarray, radius: float = 1.2) -> np.ndarray:
    img = Image.fromarray(alpha_u8, mode="L")
    img = img.filter(ImageFilter.GaussianBlur(radius=radius))
    return np.array(img)


def fix_black_fringe(rgba: np.ndarray) -> np.ndarray:
    out = rgba.astype(np.float64).copy()
    a = out[:, :, 3]
    fringe = (a > 8) & (a < 250) & (out[:, :, :3].mean(axis=2) < 35)
    if not np.any(fringe):
        return rgba

    for _ in range(8):
        if not np.any(fringe):
            break
        pad_rgb = np.pad(out[:, :, :3], ((1, 1), (1, 1), (0, 0)), mode="edge")
        pad_a = np.pad(out[:, :, 3], ((1, 1), (1, 1)), mode="edge")
        sum_rgb = np.zeros_like(out[:, :, :3])
        sum_w = np.zeros(out.shape[:2], dtype=np.float64)
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dx == 0 and dy == 0:
                    continue
                nrgb = pad_rgb[
                    1 + dy : 1 + dy + out.shape[0], 1 + dx : 1 + dx + out.shape[1]
                ]
                na = pad_a[
                    1 + dy : 1 + dy + out.shape[0], 1 + dx : 1 + dx + out.shape[1]
                ]
                w = ((na >= 180) & (nrgb.mean(axis=2) >= 40)).astype(np.float64)
                sum_rgb += nrgb * w[:, :, None]
                sum_w += w
        has = (sum_w > 0) & fringe
        filled = sum_rgb / np.maximum(sum_w[:, :, None], 1e-6)
        out[:, :, :3] = np.where(has[:, :, None], filled, out[:, :, :3])
        fringe = (a > 8) & (a < 250) & (out[:, :, :3].mean(axis=2) < 35)

    kill = (a > 0) & (a < 250) & (out[:, :, :3].mean(axis=2) < 25)
    out[kill, 3] = 0
    return np.clip(out, 0, 255).astype(np.uint8)


def decontaminate(rgba: np.ndarray, bg: np.ndarray) -> np.ndarray:
    out = rgba.astype(np.float64).copy()
    a = out[:, :, 3] / 255.0
    edge = (a > 0.02) & (a < 0.98)
    if not np.any(edge):
        return rgba

    c = out[:, :, :3]
    a3 = a[:, :, None]
    bg3 = bg.reshape(1, 1, 3)
    f = (c - (1.0 - a3) * bg3) / np.maximum(a3, 1e-4)
    f = np.clip(f, 0, 255)

    dist = np.linalg.norm(c - bg3, axis=2)
    spill = edge & (dist < 45) & (c.mean(axis=2) > 160)
    out[:, :, :3] = np.where(spill[:, :, None], f, c)

    for _ in range(2):
        pad = np.pad(out[:, :, :3], ((1, 1), (1, 1), (0, 0)), mode="edge")
        neighbors = (
            pad[0:-2, 0:-2]
            + pad[0:-2, 1:-1]
            + pad[0:-2, 2:]
            + pad[1:-1, 0:-2]
            + pad[1:-1, 2:]
            + pad[2:, 0:-2]
            + pad[2:, 1:-1]
            + pad[2:, 2:]
        ) / 8.0
        dist = np.linalg.norm(out[:, :, :3] - bg3, axis=2)
        still = spill & (dist < 45)
        out[:, :, :3] = np.where(
            still[:, :, None], 0.35 * out[:, :, :3] + 0.65 * neighbors, out[:, :, :3]
        )

    out[:, :, 3] = rgba[:, :, 3]
    return fix_black_fringe(np.clip(out, 0, 255).astype(np.uint8))


def refine_with_alpha_matting(
    rgb: np.ndarray, mask_u8: np.ndarray, fg_thr: int = 240, bg_thr: int = 10
) -> np.ndarray:
    """Build trimap from cleaned mask and run pymatting CF alpha."""
    from pymatting.alpha.estimate_alpha_cf import estimate_alpha_cf
    from pymatting.foreground.estimate_foreground_ml import estimate_foreground_ml

    h, w = mask_u8.shape
    # Trimap: erode FG/BG so uncertain band captures hair/jewelry
    definite_fg = ndi.binary_erosion(mask_u8 >= 200, structure=np.ones((3, 3)))
    definite_bg = ndi.binary_erosion(mask_u8 <= 30, structure=np.ones((3, 3)))
    # Ensure both FG and BG exist for pymatting
    if not definite_bg.any():
        definite_bg = mask_u8 <= bg_thr
    if not definite_fg.any():
        definite_fg = mask_u8 >= fg_thr

    trimap = np.full((h, w), 128, dtype=np.uint8)
    trimap[definite_fg] = 255
    trimap[definite_bg] = 0

    img = rgb.astype(np.float64) / 255.0
    tri = trimap.astype(np.float64) / 255.0
    try:
        alpha = estimate_alpha_cf(img, tri)
        fg = estimate_foreground_ml(img, alpha)
    except Exception as e:
        print(f"    matting fallback ({e})", flush=True)
        alpha = mask_u8.astype(np.float64) / 255.0
        fg = img

    rgba = np.zeros((h, w, 4), dtype=np.float64)
    rgba[:, :, :3] = np.clip(fg, 0, 1) * 255.0
    rgba[:, :, 3] = np.clip(alpha, 0, 1) * 255.0
    return rgba.astype(np.uint8)


def save_control_overlay(original_rgb: Image.Image, alpha_u8: np.ndarray, dest: Path) -> None:
    """Red mask overlay on original for quick QA."""
    base = original_rgb.convert("RGBA")
    if alpha_u8.shape[1] != base.size[0] or alpha_u8.shape[0] != base.size[1]:
        alpha_img = Image.fromarray(alpha_u8, "L").resize(base.size, Image.Resampling.LANCZOS)
        alpha_u8 = np.array(alpha_img)

    overlay = Image.new("RGBA", base.size, (220, 30, 40, 0))
    # semi-transparent red where foreground
    a = (alpha_u8.astype(np.float32) / 255.0 * 140).astype(np.uint8)
    overlay.putalpha(Image.fromarray(a, "L"))
    composed = Image.alpha_composite(base, overlay)
    # also draw hard contour
    edge = ndi.binary_dilation(alpha_u8 > 128, structure=np.ones((3, 3))) ^ (alpha_u8 > 128)
    arr = np.array(composed)
    arr[edge, :3] = (255, 40, 40)
    arr[edge, 3] = 255
    Image.fromarray(arr, "RGBA").convert("RGB").save(dest, "JPEG", quality=88)


def remove_bg_api(image: Image.Image) -> Image.Image | None:
    """Optional remove.bg if REMOVE_BG_API_KEY is set."""
    key = os.environ.get("REMOVE_BG_API_KEY") or os.environ.get("REMOVEBG_API_KEY")
    if not key:
        return None
    try:
        import urllib.request

        buf = io.BytesIO()
        image.save(buf, format="PNG")
        boundary = "----BamtaeBoundary"
        body = (
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="size"\r\n\r\nauto\r\n'
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="image_file"; filename="in.png"\r\n'
            f"Content-Type: image/png\r\n\r\n"
        ).encode() + buf.getvalue() + f"\r\n--{boundary}--\r\n".encode()
        req = urllib.request.Request(
            "https://api.remove.bg/v1.0/removebg",
            data=body,
            headers={
                "X-Api-Key": key,
                "Content-Type": f"multipart/form-data; boundary={boundary}",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=120) as resp:
            return Image.open(io.BytesIO(resp.read())).convert("RGBA")
    except Exception as e:
        print(f"    remove.bg failed: {e}", flush=True)
        return None


def process_one(src: Path, dest: Path, control_dest: Path, session) -> dict:
    original = Image.open(src).convert("RGB")
    orig_w, orig_h = original.size
    bg = estimate_background(np.array(original))

    # 1) Upscale for segmentation/matting — never shrink before the model
    work_w = int(round(orig_w * UPSCALE))
    work_h = int(round(orig_h * UPSCALE))
    work = original.resize((work_w, work_h), Image.Resampling.LANCZOS)
    print(f"    work size {work_w}×{work_h} (source {orig_w}×{orig_h})", flush=True)

    # Optional commercial API for hard cases
    api_cut = remove_bg_api(work)
    if api_cut is not None:
        print("    using remove.bg API", flush=True)
        rgba_hi = np.array(api_cut.resize((work_w, work_h), Image.Resampling.LANCZOS).convert("RGBA"))
        raw_mask = rgba_hi[:, :, 3]
    else:
        # 2) isnet mask at high-res canvas (model internals 1024, mask LANCZOS back to work size)
        raw = remove(
            work,
            session=session,
            only_mask=True,
            post_process_mask=False,
        )
        if not isinstance(raw, Image.Image):
            raw = Image.open(io.BytesIO(raw)) if isinstance(raw, (bytes, bytearray)) else Image.fromarray(raw)
        raw_mask = np.array(raw.convert("L"))
        if raw_mask.shape != (work_h, work_w):
            raw_mask = np.array(
                Image.fromarray(raw_mask, "L").resize((work_w, work_h), Image.Resampling.LANCZOS)
            )

        # 3) morphological cleanup + hole fill BEFORE alpha blur / decontam
        cleaned_mask = clean_mask(raw_mask)

        # alpha matting at high resolution with cleaned trimap
        print("    alpha matting…", flush=True)
        rgba_hi = refine_with_alpha_matting(np.array(work), cleaned_mask)
        # lift only tiny holes inside body (not large arm gaps): where cleaned
        # core is solid but matting dropped alpha
        core = cleaned_mask >= 220
        core = ndi.binary_erosion(core, structure=np.ones((7, 7)))
        a = rgba_hi[:, :, 3].astype(np.float32)
        a[core] = np.maximum(a[core], 255.0)
        rgba_hi[:, :, 3] = np.clip(a, 0, 255).astype(np.uint8)

    # light AA blur on alpha only (1–2px), then decontaminate
    alpha = antialias_alpha(rgba_hi[:, :, 3], radius=1.4)
    rgba_hi[:, :, 3] = alpha
    # restore RGB from original work image under mask (avoid matting color shifts on solid areas)
    work_rgb = np.array(work)
    solid = alpha >= 250
    rgba_hi[solid, :3] = work_rgb[solid]
    rgba_hi = decontaminate(rgba_hi, bg)

    # downscale clean cut to original size for carousel assets
    hi_img = Image.fromarray(rgba_hi, "RGBA")
    final = hi_img.resize((orig_w, orig_h), Image.Resampling.LANCZOS)
    final_arr = np.array(final)
    final_arr = decontaminate(final_arr, bg)
    Image.fromarray(final_arr, "RGBA").save(dest, "PNG", optimize=True)

    # control overlay at original resolution
    save_control_overlay(original, final_arr[:, :, 3], control_dest)

    a = final_arr[:, :, 3]
    soft = int(((a > 5) & (a < 250)).sum())
    return {
        "file": dest.name,
        "control": control_dest.name,
        "size": f"{orig_w}x{orig_h}",
        "soft_edge": soft,
        "ok": True,
    }


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    CONTROLS.mkdir(parents=True, exist_ok=True)

    print("Loading isnet-general-use…", flush=True)
    session = new_session("isnet-general-use")

    if not (os.environ.get("REMOVE_BG_API_KEY") or os.environ.get("REMOVEBG_API_KEY")):
        print(
            "Note: no REMOVE_BG_API_KEY — using isnet. Set the key to use remove.bg for hard cases.",
            flush=True,
        )

    results = []
    for i, name in SOURCES.items():
        src = PRODUCTS / name
        dest = OUT / f"carousel-{i}.png"
        control = CONTROLS / f"carousel-{i}-mask-overlay.jpg"
        if not src.exists():
            print(f"MISSING {src}", flush=True)
            return 1
        print(f"[{i}] {src.name} → {dest.name}", flush=True)
        info = process_one(src, dest, control, session)
        results.append(info)
        print(
            f"  OK soft_edge={info['soft_edge']} control={info['control']}",
            flush=True,
        )

    print("\n=== controls ===", flush=True)
    for r in results:
        print(f"  public/hero/controls/{r['control']}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
