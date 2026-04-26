import { Component, signal, computed } from '@angular/core';

const TASA_MORA_EA = 0.2236; // 22.36% EA — Decreto vigente 2026

@Component({
  selector: 'app-mora-tributaria',
  standalone: true,
  imports: [],
  templateUrl: './mora-tributaria.component.html',
})
export class MoraTributariaComponent {
  deudaRaw = signal(0);
  diasMora = signal(90);
  usarFecha = signal(false);
  fechaVencimiento = signal('');

  readonly deudaDisplay = computed(() =>
    this.deudaRaw() > 0 ? new Intl.NumberFormat('es-CO').format(this.deudaRaw()) : ''
  );

  readonly diasCalculados = computed(() => {
    if (this.usarFecha() && this.fechaVencimiento()) {
      const venc = new Date(this.fechaVencimiento() + 'T00:00:00');
      const hoy = new Date();
      const diff = Math.floor((hoy.getTime() - venc.getTime()) / (1000 * 60 * 60 * 24));
      return Math.max(0, diff);
    }
    return this.diasMora();
  });

  readonly result = computed(() => {
    const D = this.deudaRaw();
    const n = this.diasCalculados();
    const intereses = D * (Math.pow(1 + TASA_MORA_EA, n / 365) - 1);
    const total = D + intereses;
    const tasaDiaria = (Math.pow(1 + TASA_MORA_EA, 1 / 365) - 1) * 100;
    return { intereses, total, tasaDiaria };
  });

  onDeudaInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.deudaRaw.set(n);
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
}
