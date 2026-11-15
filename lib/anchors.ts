/** Convierte un encabezado en un id de ancla ASCII estable. */
export function anchorId(heading: string): string {
  return (
    heading
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "seccion"
  );
}
