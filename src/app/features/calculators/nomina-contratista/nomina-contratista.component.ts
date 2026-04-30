import { Component, signal, computed } from '@angular/core';

const SMMLV_2026 = 1_750_905;
const UVT_2026 = 52_374;

export const RETENCIONES = [
  { label: 'Honorarios · Persona Natural (10%)',    rate: 0.10, minBase: 0,           norma: 'Art. 392 ET' },
  { label: 'Honorarios · Persona Jurídica (11%)',   rate: 0.11, minBase: 0,           norma: 'Art. 392 ET' },
  { label: 'Servicios generales · PN (4%)',         rate: 0.04, minBase: UVT_2026 * 2, norma: 'Art. 392 ET · base mín. 2 UVT' },
  { label: 'Servicios generales · PJ (6%)',         rate: 0.06, minBase: UVT_2026 * 2, norma: 'Art. 392 ET · base mín. 2 UVT' },
  { label: 'Comisiones · PN (10%)',                 rate: 0.10, minBase: 0,           norma: 'Art. 392 ET' },
  { label: 'Comisiones · PJ (11%)',                 rate: 0.11, minBase: 0,           norma: 'Art. 392 ET' },
  { label: 'Arrendamiento bienes raíces (3.5%)',    rate: 0.035, minBase: 0,          norma: 'Art. 401 ET' },
  { label: 'Sin retención (0%)',                    rate: 0,    minBase: 0,           norma: '' },
];

@Component({
  selector: 'app-nomina-contratista',
  standalone: true,
  imports: [],
  templateUrl: './nomina-contratista.component.html',
})
export class NominaContratistaComponent {
  // ── Empleado ────────────────────────────────────────────────────────────────
  salarioEmp = signal(0);
  auxTransporte = signal(0);

  readonly salarioEmpDisplay = computed(() =>
    this.salarioEmp() > 0 ? new Intl.NumberFormat('es-CO').format(this.salarioEmp()) : ''
  );
  readonly auxDisplay = computed(() =>
    this.auxTransporte() > 0 ? new Intl.NumberFormat('es-CO').format(this.auxTransporte()) : ''
  );

  readonly empleado = computed(() => {
    const s = this.salarioEmp();
    const aux = this.auxTransporte();

    const salud_emp     = s * 0.04;
    const pension_emp   = s * 0.04;
    const neto          = s + aux - salud_emp - pension_emp;

    const salud_empresa   = s * 0.085;
    const pension_empresa = s * 0.12;
    const arl             = s * 0.01044;
    const parafiscal      = s * 0.09;
    const cesantias       = (s + aux) * 0.0833;
    const prima           = (s + aux) * 0.0833;
    const int_cesantias   = (s + aux) * 0.01;
    const vacaciones      = s * 0.0417;

    const total_empresa = s + aux + salud_empresa + pension_empresa + arl +
      parafiscal + cesantias + prima + int_cesantias + vacaciones;
    const prestaciones_pct = s > 0 ? ((total_empresa - s - aux) / s) * 100 : 0;

    return {
      s, aux, salud_emp, pension_emp, neto,
      salud_empresa, pension_empresa, arl, parafiscal,
      cesantias, prima, int_cesantias, vacaciones,
      total_empresa, prestaciones_pct,
    };
  });

  // ── Contratista ─────────────────────────────────────────────────────────────
  readonly retenciones = RETENCIONES;
  salarioCon = signal(0);
  retencionIdx = signal(0);

  readonly salarioConDisplay = computed(() =>
    this.salarioCon() > 0 ? new Intl.NumberFormat('es-CO').format(this.salarioCon()) : ''
  );

  readonly contratista = computed(() => {
    const f   = this.salarioCon();
    const ret = this.retenciones[this.retencionIdx()];
    const ibc = Math.max(f * 0.4, SMMLV_2026);
    const salud    = ibc * 0.125;
    const pension  = ibc * 0.16;
    const aplica   = f >= ret.minBase;
    const retencion = aplica ? f * ret.rate : 0;
    const total_ded = salud + pension + retencion;
    const neto      = f - total_ded;

    return { f, ibc, salud, pension, retencion, total_ded, neto, ret, aplica };
  });

  // ── Helpers ─────────────────────────────────────────────────────────────────
  onEmpInput(e: Event): void    { this._setSignal(e, this.salarioEmp); }
  onAuxInput(e: Event): void    { this._setSignal(e, this.auxTransporte); }
  onConInput(e: Event): void    { this._setSignal(e, this.salarioCon); }

  private _setSignal(e: Event, sig: ReturnType<typeof signal<number>>): void {
    const el = e.target as HTMLInputElement;
    const n  = parseInt(el.value.replace(/\D/g, ''), 10) || 0;
    sig.set(n);
    el.value = n > 0 ? new Intl.NumberFormat('es-CO').format(n) : '';
  }

  fmt(v: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(v);
  }
  fmtPct(v: number): string { return v.toFixed(1) + '%'; }
}
