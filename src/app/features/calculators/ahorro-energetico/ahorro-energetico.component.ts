import { Component, signal, computed } from '@angular/core';

const FACTOR_CO2 = 0.1261; // kg CO2 por kWh (SIN Colombia — promedio red)

@Component({
  selector: 'app-ahorro-energetico',
  standalone: true,
  imports: [],
  templateUrl: './ahorro-energetico.component.html',
})
export class AhorroEnergeticoComponent {
  consumoKwh = signal(250);       // kWh mensuales
  tarifaKwh = signal(900);        // COP por kWh
  inversionRaw = signal(15_000_000); // COP inversión sistema
  generacionPct = signal(80);     // % del consumo cubierto por solar

  readonly inversionDisplay = computed(() =>
    this.inversionRaw() > 0 ? new Intl.NumberFormat('es-CO').format(this.inversionRaw()) : ''
  );

  readonly result = computed(() => {
    const kwhSolar = this.consumoKwh() * (this.generacionPct() / 100);
    const ahorroMensual = kwhSolar * this.tarifaKwh();
    const ahorroAnual = ahorroMensual * 12;
    const inv = this.inversionRaw();
    const paybackAnos = inv > 0 && ahorroAnual > 0 ? inv / ahorroAnual : 0;
    const co2AnualKg = kwhSolar * 12 * FACTOR_CO2;
    const co2AnualTon = co2AnualKg / 1000;
    // Ley 1715 Art. 11: deducción del 50% del valor de la inversión en renta
    const deduccionLey1715 = inv * 0.5;
    // Ahorro fiscal estimado: 35% tarifa PJ (referencia)
    const ahorroFiscalPJ = deduccionLey1715 * 0.35;
    const roi10Anos = inv > 0 ? ((ahorroAnual * 10 - inv) / inv) * 100 : 0;

    return { ahorroMensual, ahorroAnual, paybackAnos, co2AnualTon, deduccionLey1715, ahorroFiscalPJ, roi10Anos };
  });

  onInversionInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.inversionRaw.set(n);
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

  fmtDec(v: number, d = 1): string {
    return v.toFixed(d);
  }
}
