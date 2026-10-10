// Anuncios de AdSense con huecos de tamaño fijo: el espacio se reserva desde el primer
// render, así que el anuncio nunca empuja el contenido (sin saltos de maquetación, CLS 0).
// Auto ads está desactivado en AdSense: solo se muestran estos bloques.
//
// ADS_ENABLED: poner a true cuando AdSense apruebe este sitio. Mientras sea false no se
// pinta ningún hueco (ni cajas vacías).
export const ADS_ENABLED = false;

export const AD_CLIENT = "ca-pub-6063067965030118";

// Bloques creados en AdSense (Anuncios > Por bloque de anuncios), compartidos por los 5 blogs.
export const AD_UNITS = {
  // Dentro del contenido: cabe en móvil y en escritorio.
  contenido: { slot: "2881859299", width: 300, height: 250 },
  // Barra lateral, solo escritorio (la barra se oculta en móvil).
  lateral: { slot: "9464588678", width: 300, height: 600 },
} as const;

export type AdPlacement = keyof typeof AD_UNITS;
