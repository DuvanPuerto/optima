import { Component, signal, computed } from '@angular/core';

const SMMLV_2026 = 1_750_905;

@Component({
  selector: 'app-nomina-contratista',
  standalone: true,
  imports: [],
  templateUrl: './nomina-contratista.component.html',
})
export class NominaContratistaComponent {
  salario = signal(3_500_000);
  auxTransporte = signal(0);
  tipo = signal<'pn' | 'pj'>('pn');

  readonly salarioDisplay = computed(() =>
    this.salario() > 0 ? new Intl.NumberFormat('es-CO').format(this.salario()) : ''
  );

  readonly auxDisplay = computed(() =>
    this.auxTransporte() > 0 ? new Intl.NumberFormat('es-CO').format(this.auxTransporte()) : ''
  );

  readonly empleado = computed(() => {
    const s = this.salario();
    const aux = this.auxTransporte();

    // Salud y pensión se calculan solo sobre el salario (no sobre auxilio)
    const salud_emp = s * 0.04;
    const pension_emp = s * 0.04;
    const neto = s + aux - salud_emp - pension_emp;

    // Costos empleador
    const salud_empresa = s * 0.085;
    const pension_empresa = s * 0.12;
    const arl = s * 0.01044;
    const parafiscal = s * 0.09;

    // Cesantías, prima e intereses sobre cesantías: base salario + auxilio
    const cesantias = (s + aux) * 0.0833;
    const prima = (s + aux) * 0.0833;
    const int_cesantias = (s + aux) * 0.01;

    // Vacaciones: solo sobre salario (no incluye auxilio)
    const vacaciones = s * 0.0417;

    const total_empresa =
      s + aux + salud_empresa + pension_empresa + arl + parafiscal +
      cesantias + prima + vacaciones + int_cesantias;
    const prestaciones_pct = s > 0 ? ((total_empresa - s - aux) / s) * 100 : 0;

    return {
      s, aux, salud_emp, pension_emp, neto,
      salud_empresa, pension_empresa, arl, parafiscal,
      cesantias, prima, vacaciones, int_cesantias,
      total_empresa, prestaciones_pct,
    };
  });

  readonly contratista = computed(() => {
    const f = this.salario();
    const ibc = Math.max(f * 0.4, SMMLV_2026);
    const salud = ibc * 0.125;
    const pension = ibc * 0.16;
    const retRate = this.tipo() === 'pn' ? 0.10 : 0.11;
    const retencion = f * retRate;
    const total_ded = salud + pension + retencion;
    const neto = f - total_ded;

    return { f, ibc, salud, pension, retencion, total_ded, neto };
  });

  onSalarioInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.salario.set(n);
    (e.target as HTMLInputElement).value = n > 0 ? new Intl.NumberFormat('es-CO').format(n) : '';
  }

  onAuxInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.auxTransporte.set(n);
    (e.target as HTMLInputElement).value = n > 0 ? new Intl.NumberFormat('es-CO').format(n) : '';
  }

  fmt(v: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);
  }

  fmtPct(v: number): string {
    return v.toFixed(1) + '%';
  }
}
