# Optima by Angie Céspedes — Requerimientos y Plan de Diseño

## 1. Visión General

**Aplicación:** Optima by Angie Céspedes  
**Tipo:** SPA (Single Page Application) 100% frontend — sin backend  
**Propósito:** Plataforma digital profesional para una contadora y asesora financiera  
**Stack:** Angular 21 · Tailwind CSS v4 · Formspree · TypeScript

---

## 2. Requerimientos Funcionales

### 2.1 Landing Page con Animaciones al Scroll

- Todas las secciones aplican animaciones de entrada (fade-in, slide-up, scale-in) mediante `IntersectionObserver`
- La animación se dispara una sola vez cuando el elemento entra al viewport
- Navegación sticky con links de ancla a cada sección

### 2.2 Secciones del Landing

| #   | Sección                      | Contenido                                                                                                               |
| --- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | **Hero**                     | Headline, subtítulo, CTAs (WhatsApp + Contacto), imagen de profesional                                                  |
| 2   | **Métricas / Stats**         | Contadores animados: clientes atendidos, años de experiencia, proyectos, empresas asesoradas                            |
| 3   | **Servicios**                | Contabilidad, Declaración de Renta, Asesoría Financiera, Planeación Tributaria, Nómina y RRHH, Constitución de Empresas |
| 4   | **Sobre Angie**              | Perfil profesional, credenciales, certificaciones, misión y valores                                                     |
| 5   | **Calculadoras Financieras** | Preview / acceso rápido a las herramientas                                                                              |
| 6   | **Testimonios**              | Tarjetas de clientes satisfechos con avatar y calificación                                                              |
| 7   | **Recursos Descargables**    | Links a pdfs/guías estáticas (checklist de documentos, guía DIAN, etc.)                                                 |
| 8   | **FAQ**                      | Preguntas frecuentes con acordeón animado                                                                               |
| 9   | **Contacto / PQRS**          | Formulario vía Formspree + mapa de Google Maps embed                                                                    |
| 10  | **Footer**                   | Redes sociales, datos de contacto, links rápidos, copyright                                                             |

### 2.3 Calculadoras Financieras (Ruta: `/calculadoras`)

1. **Calculadora de Préstamos**
   - Entradas: Monto, Tasa de interés anual (%), Plazo (meses)
   - Salidas: Cuota mensual, Total a pagar, Total de intereses, Tabla de amortización
   - Fórmula: `M = P × [r(1+r)^n] / [(1+r)^n − 1]`

2. **Calculadora de Ahorro**
   - Entradas: Capital inicial, Aporte mensual, Tasa de interés anual (%), Plazo (años)
   - Salidas: Monto final, Total aportado, Intereses ganados, Gráfico de evolución

3. **Estimador de Impuesto de Renta (Colombia)**
   - Entradas: Ingresos brutos anuales (COP), Tipo de persona (Natural / Jurídica)
   - Salidas: Renta líquida, Impuesto estimado, Uvt equivalente
   - Basado en tablas de la DIAN (datos estáticos actualizables en config)

### 2.4 Formulario PQRS (Ruta: `/pqrs`)

- Campos: Nombre completo, Email, Teléfono, Tipo (Petición / Queja / Reclamo / Sugerencia), Asunto, Mensaje, Archivo adjunto
- Envío vía **Formspree** (sin backend propio)
- Validaciones reactivas en tiempo real
- Estado de envío: cargando → éxito / error

### 2.5 Botón Flotante de WhatsApp

- Visible en toda la aplicación (posición fixed)
- Mensaje predefinido configurable
- Badge de "En línea" con efecto pulse

### 2.6 Botón de Volver Arriba (Scroll-to-Top)

- Aparece al bajar más de 400px
- Animación suave de subida

---

## 3. Requerimientos No Funcionales

- **Responsive:** Mobile-first design, breakpoints: sm (640px) / md (768px) / lg (1024px) / xl (1280px)
- **Performance:** Lazy loading de rutas, imágenes optimizadas, sin dependencias pesadas
- **Accesibilidad:** ARIA labels, contraste de colores WCAG AA, navegación por teclado
- **SEO básico:** Meta tags Open Graph, título descriptivo, lang="es"
- **Paleta de colores parametrizada:** Variables CSS centralizadas editables en un solo archivo

---

## 4. Paleta de Colores

Todas las variables se definen en `src/styles.css` vía `@theme` de Tailwind v4.

```
--color-primary:       #1B3A5C   (Azul marino — profesionalismo, confianza)
--color-primary-light: #2D5F8A   (Azul medio — hover states)
--color-primary-dark:  #0D2137   (Azul oscuro — texto sobre fondo claro)
--color-secondary:     #C9A84C   (Oro — prosperidad, éxito financiero)
--color-secondary-light:#D4BA78  (Oro claro — hover states)
--color-accent:        #2A9D8F   (Verde teal — crecimiento, equilibrio)
--color-bg:            #F5F7FA   (Crema claro — fondo principal)
--color-surface:       #FFFFFF   (Blanco — tarjetas, modales)
--color-text:          #1A1A2E   (Casi negro — texto principal)
--color-text-muted:    #64748B   (Gris pizarra — texto secundario)
--color-border:        #E2E8F0   (Gris muy claro — bordes)
--color-success:       #10B981   (Verde — éxito)
--color-error:         #EF4444   (Rojo — errores)
```

---

## 5. Arquitectura de Componentes

```
src/
├── index.html                         # Meta SEO, Google Fonts, lang="es"
├── styles.css                         # @theme variables + animaciones globales
├── main.ts
└── app/
    ├── app.ts                         # Root component (navbar + router-outlet + FABs)
    ├── app.html
    ├── app.routes.ts                  # Rutas: /  /calculadoras  /pqrs
    ├── app.config.ts
    │
    ├── config/
    │   ├── theme.config.ts            # Paleta y tokens de diseño (fuente de verdad)
    │   ├── content.config.ts          # Servicios, testimonios, FAQ (datos estáticos)
    │   └── tax-tables.config.ts       # Tablas DIAN para cálculo de renta
    │
    ├── core/
    │   └── directives/
    │       └── scroll-animate.directive.ts  # IntersectionObserver → clase 'visible'
    │
    ├── shared/
    │   └── components/
    │       ├── navbar/
    │       ├── footer/
    │       ├── whatsapp-fab/          # Botón flotante WhatsApp
    │       └── scroll-top-fab/        # Botón volver arriba
    │
    └── features/
        ├── home/
        │   ├── home.component.ts      # Página principal (lazy)
        │   └── sections/
        │       ├── hero/
        │       ├── stats/
        │       ├── services/
        │       ├── about/
        │       ├── calculators-preview/
        │       ├── testimonials/
        │       ├── resources/
        │       ├── faq/
        │       └── contact/
        ├── calculators/
        │   ├── calculators.component.ts   (lazy)
        │   ├── loan-calculator/
        │   ├── savings-calculator/
        │   └── tax-estimator/
        └── pqrs/
            └── pqrs.component.ts          (lazy)
```

---

## 6. Flujo de Navegación

```
/ (home)
  ├── #hero
  ├── #stats
  ├── #servicios
  ├── #sobre-mi
  ├── #calculadoras      → enlace a ruta /calculadoras
  ├── #testimonios
  ├── #recursos
  ├── #faq
  └── #contacto          → enlace a ruta /pqrs (PQRS completo)

/calculadoras
  └── Tabs: Préstamos | Ahorro | Impuesto Renta

/pqrs
  └── Formulario PQRS completo
```

---

## 7. Integraciones de Terceros

| Servicio              | Propósito                                               | Config                                      |
| --------------------- | ------------------------------------------------------- | ------------------------------------------- |
| **Formspree**         | Envío de PQRS sin backend                               | `FORMSPREE_ENDPOINT` en `content.config.ts` |
| **WhatsApp API**      | Link flotante `wa.me/`                                  | Número y mensaje en `content.config.ts`     |
| **Google Fonts**      | Tipografía: Playfair Display (títulos) + Inter (cuerpo) | `index.html`                                |
| **Google Maps Embed** | Mapa en sección contacto                                | URL configurable en `content.config.ts`     |

---

## 8. Plan de Implementación

### Fase 1 — Infraestructura (config + estilos + rutas)

- [ ] Configurar paleta en `styles.css` (@theme Tailwind v4)
- [ ] Actualizar `index.html` (meta SEO, Google Fonts)
- [ ] Crear `config/theme.config.ts`, `config/content.config.ts`, `config/tax-tables.config.ts`
- [ ] Configurar rutas lazy en `app.routes.ts`
- [ ] Crear directiva `scroll-animate.directive.ts`

### Fase 2 — Layout compartido

- [ ] `navbar` component (responsive, sticky, scroll-aware)
- [ ] `footer` component
- [ ] `whatsapp-fab` component
- [ ] `scroll-top-fab` component
- [ ] Actualizar `app.ts` / `app.html`

### Fase 3 — Landing page (secciones)

- [ ] Hero section
- [ ] Stats section (contador animado)
- [ ] Services section
- [ ] About section
- [ ] Calculators preview section
- [ ] Testimonials section
- [ ] Resources section
- [ ] FAQ section (acordeón)
- [ ] Contact section (mapa + mini-form CTA)

### Fase 4 — Features interactivas

- [ ] Calculadora de Préstamos (con tabla de amortización)
- [ ] Calculadora de Ahorro
- [ ] Estimador de Impuesto de Renta Colombia
- [ ] Formulario PQRS completo con Formspree

### Fase 5 — Pulido

- [ ] Meta tags SEO en `index.html`
- [ ] Animaciones y transiciones de página
- [ ] Accesibilidad (ARIA)
- [ ] Revisión de responsividad
