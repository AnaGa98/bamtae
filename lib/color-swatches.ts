/** Maps Bamtae color names to display hex for swatches. */
const COLOR_HEX: Record<string, string> = {
  negro: "#1A1A1A",
  blanco: "#F5F5F5",
  beige: "#D8B7A4",
  cafe: "#6B4F43",
  café: "#6B4F43",
  vino: "#7A2E3A",
  rojo: "#C1512F",
  rosa: "#E8C4C4",
  rosado: "#E8C4C4",
  amarillo: "#D9A441",
  azul: "#5B7C99",
  "azul claro": "#8BA4BC",
  morado: "#6B4C7A",
  gris: "#8A8580",
  "verde esmeralda": "#2F6B57",
  "verde oliva": "#6B7A4A",
}

function normalizeColorKey(color: string): string {
  return color
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function getColorHex(color: string): string {
  const key = color.toLowerCase().trim()
  const ascii = normalizeColorKey(color)
  return COLOR_HEX[key] || COLOR_HEX[ascii] || COLOR_HEX[ascii.replace(/-/g, " ")] || "#B8A89C"
}

export function needsSwatchBorder(hex: string): boolean {
  const light = ["#F5F5F5", "#D8B7A4", "#E8C4C4", "#D9A441"].includes(hex.toUpperCase())
  return light || hex.toUpperCase() === "#F5F5F5"
}
