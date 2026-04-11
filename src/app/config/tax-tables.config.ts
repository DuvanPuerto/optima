/**
 * Tablas DIAN para estimación de impuesto de renta Colombia.
 * Fuente de verdad: actualizar con los valores del año gravable vigente.
 * Última actualización: AÑO GRAVABLE 2024 — UVT = $47,065
 */

export const UVT_VALUE = 47065; // Pesos colombianos por UVT (año gravable 2024)

/**
 * Tabla de impuesto para personas naturales residentes (Art. 241 ET)
 * Rangos expresados en UVT. Tarifa marginal aplica sobre el exceso del límite inferior.
 */
export const TAX_TABLE_NATURAL = [
  { from: 0, to: 1090, rate: 0, base: 0 },
  { from: 1090, to: 1700, rate: 0.19, base: 0 },
  { from: 1700, to: 4100, rate: 0.28, base: 116 },
  { from: 4100, to: 8670, rate: 0.33, base: 788 },
  { from: 8670, to: 18970, rate: 0.35, base: 2296 },
  { from: 18970, to: 31000, rate: 0.37, base: 5901 },
  { from: 31000, to: Infinity, rate: 0.39, base: 10352 },
];

/**
 * Tabla de impuesto para personas jurídicas (renta fija)
 */
export const TAX_RATE_JURIDICA = 0.35; // 35% tarifa general (Art. 240 ET)
