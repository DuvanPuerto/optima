/**
 * ================================================================
 * PALETA DE COLORES — Optima by Angie Céspedes
 * ================================================================
 * Esta es la ÚNICA fuente de verdad para los colores del proyecto.
 * Los mismos valores se declaran como variables CSS en styles.css
 * (bloque @theme + :root) para que estén disponibles en Tailwind
 * y en estilos inline.
 *
 * Para cambiar el tema basta con editar los HEX aquí y en styles.css.
 * ================================================================
 *
 * ⚫ Fondo primario (Deep Dark)
 *    primaryDark  #0D1412   — fondo general de la página
 *    primary      #1A2622   — navbar, tarjetas, superficies
 *
 * Superficie de contraste
 *    primaryLight #243330   — hover states, secciones alternas
 *    accent       #6B8880   — íconos, chips, texto de apoyo
 *
 * Texto
 *    text         #C4C4C4   — texto principal (gris suave)
 *    textMuted    #8A8A8A   — texto secundario
 *
 * Bordes sutiles dorados
 *    border       rgba(197,160,89,0.2)  — estándar
 *    borderLight  rgba(197,160,89,0.12) — divisores
 *
 * Dorado metálico (acento / CTA)
 *    secondary    #C5A059   — botones CTA, logos, highlights
 *    secondaryDark#A8853F   — hover de CTAs
 *    secondaryLight#D8B875  — gradiente claro
 */
export const THEME = {
  colors: {
    // Superficies oscuras
    primaryDark: '#0D1412',
    primary: '#1A2622',
    primaryLight: '#243330',

    // Acento verde-gris
    accent: '#6B8880',
    accentLight: '#8FA8A2',

    // Dorado metálico — CTA y highlights
    secondary: '#C5A059',
    secondaryDark: '#A8853F',
    secondaryLight: '#D8B875',

    // Fondos
    bg: '#0D1412',
    surface: '#1A2622',
    surface2: '#243330',

    // Texto
    text: '#C4C4C4',
    textMuted: '#8A8A8A',

    // Bordes
    border: 'rgba(197, 160, 89, 0.2)',
    borderLight: 'rgba(197, 160, 89, 0.12)',

    // Estado
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  fonts: {
    heading: "'Cinzel', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
  },
} as const;
