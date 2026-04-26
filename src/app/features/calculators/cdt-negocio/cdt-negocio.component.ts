import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-cdt-negocio',
  standalone: true,
  imports: [],
  templateUrl: './cdt-negocio.component.html',
})
export class CdtNegocioComponent {
  capitalRaw = signal(10_000_000);
  tasaCDT = signal(13.5);    // % EA
  tasaNegocio = signal(2.5); // % mensual
  plazo = signal(12);        // meses

  readonly capitalDisplay = computed(() =>
    this.capitalRaw() > 0 ? new Intl.NumberFormat('es-CO').format(this.capitalRaw()) : ''
  );

  readonly result = computed(() => {
    const C = this.capitalRaw();
    const n = this.plazo();

    // CDT: EA → mensual compuesto
    const cdtMonthly = Math.pow(1 + this.tasaCDT() / 100, 1 / 12) - 1;
    const cdtFinal = C * Math.pow(1 + cdtMonthly, n);
    const cdtRendimiento = cdtFinal - C;

    // Negocio: rentabilidad mensual compuesta
    const negocioFinal = C * Math.pow(1 + this.tasaNegocio() / 100, n);
    const negocioRendimiento = negocioFinal - C;

    const cdtWins = cdtRendimiento >= negocioRendimiento;
    const diferencia = Math.abs(cdtRendimiento - negocioRendimiento);
    const rentabilidadNegocio_EA = (Math.pow(1 + this.tasaNegocio() / 100, 12) - 1) * 100;

    return {
      cdtFinal, cdtRendimiento,
      negocioFinal, negocioRendimiento,
      cdtWins, diferencia,
      rentabilidadNegocio_EA,
    };
  });

  onCapitalInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.capitalRaw.set(n);
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
    return v.toFixed(2) + '%';
  }
}
