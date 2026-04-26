import { Component, signal, computed } from '@angular/core';

type Tag = 'all' | 'renta' | 'iva' | 'retencion' | 'otros';

interface Obligacion {
  name: string;
  period: string;
  who: string;
  months: string;
  tag: Exclude<Tag, 'all'>;
}

const OBLIGACIONES: Obligacion[] = [
  { name: 'Declaración Renta PN (año gravable 2025)', period: 'Anual', who: 'Personas naturales obligadas a declarar', months: 'Agosto – Octubre 2026', tag: 'renta' },
  { name: 'Declaración Renta PJ (año gravable 2025)', period: 'Anual', who: 'Personas jurídicas', months: 'Abril – Junio 2026', tag: 'renta' },
  { name: 'Declaración Renta Grandes Contribuyentes (2025)', period: 'Anual', who: 'Grandes contribuyentes', months: 'Febrero – Abril 2026', tag: 'renta' },
  { name: 'IVA bimestral', period: 'Bimestral', who: 'Responsables con ingresos > 3.500 UVT', months: 'Ene · Mar · May · Jul · Sep · Nov', tag: 'iva' },
  { name: 'IVA cuatrimestral', period: 'Cuatrimestral', who: 'Responsables con ingresos entre 15 y 3.500 UVT', months: 'Mayo · Septiembre 2026 · Enero 2027', tag: 'iva' },
  { name: 'IVA anual', period: 'Anual', who: 'Responsables con ingresos ≤ 15 UVT/mes', months: 'Enero 2027 (período 2026)', tag: 'iva' },
  { name: 'Retención en la fuente', period: 'Mensual', who: 'Agentes retenedores (declarantes o no)', months: 'Todos los meses — días 9 a 23', tag: 'retencion' },
  { name: 'Autorretención especial de renta', period: 'Mensual', who: 'Sociedades con residencia en Colombia', months: 'Todos los meses — días 9 a 23', tag: 'retencion' },
  { name: 'Información exógena año gravable 2025', period: 'Anual', who: 'Obligados — grandes y medianos contribuyentes', months: 'Marzo – Abril 2026', tag: 'otros' },
  { name: 'Activos en el exterior (2025)', period: 'Anual', who: 'PN y PJ con activos en el ext. > 2.000 UVT', months: 'Octubre 2026', tag: 'otros' },
  { name: 'GMF (4×1000)', period: 'Anual', who: 'Entidades financieras — recaudo', months: 'Junio – Julio 2026', tag: 'otros' },
  { name: 'Impuesto al patrimonio 2026', period: 'Anual', who: 'PN con patrimonio líquido > 72.000 UVT', months: 'Septiembre – Octubre 2026', tag: 'otros' },
];

// Calendario renta PN (año gravable 2025) — aproximado según patrón histórico
const CEDULA = [
  { dig: '01–09', fecha: '12 ago 2026' },
  { dig: '10–19', fecha: '13 ago 2026' },
  { dig: '20–29', fecha: '18 ago 2026' },
  { dig: '30–39', fecha: '19 ago 2026' },
  { dig: '40–49', fecha: '20 ago 2026' },
  { dig: '50–59', fecha: '21 ago 2026' },
  { dig: '60–69', fecha: '25 ago 2026' },
  { dig: '70–79', fecha: '26 ago 2026' },
  { dig: '80–89', fecha: '27 ago 2026' },
  { dig: '90–99', fecha: '28 ago 2026' },
  { dig: '00', fecha: '23 oct 2026' },
];

@Component({
  selector: 'app-calendario-dian',
  standalone: true,
  imports: [],
  templateUrl: './calendario-dian.component.html',
})
export class CalendarioDianComponent {
  readonly obligaciones = OBLIGACIONES;
  readonly cedula = CEDULA;

  filterTag = signal<Tag>('all');

  readonly filtered = computed(() => {
    const t = this.filterTag();
    return t === 'all' ? this.obligaciones : this.obligaciones.filter((o) => o.tag === t);
  });

  readonly filters: { id: Tag; label: string }[] = [
    { id: 'all', label: 'Todas' },
    { id: 'renta', label: 'Renta' },
    { id: 'iva', label: 'IVA' },
    { id: 'retencion', label: 'Retención' },
    { id: 'otros', label: 'Otros' },
  ];

  tagBg(tag: string): string {
    const m: Record<string, string> = {
      renta: 'rgba(197,160,89,0.15)',
      iva: 'rgba(107,136,128,0.25)',
      retencion: 'rgba(239,68,68,0.12)',
      otros: 'rgba(255,255,255,0.07)',
    };
    return m[tag] ?? m['otros'];
  }

  tagColor(tag: string): string {
    const m: Record<string, string> = {
      renta: 'var(--secondary-light)',
      iva: '#8FA8A2',
      retencion: '#f87171',
      otros: 'var(--text-muted)',
    };
    return m[tag] ?? m['otros'];
  }
}
