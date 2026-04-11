import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyInputDirective } from '../../../shared/directives/currency-input.directive';

@Component({
  selector: 'app-savings-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyInputDirective],
  templateUrl: './savings-calculator.component.html',
})
export class SavingsCalculatorComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    initial: [null, [Validators.required, Validators.min(0)]],
    monthly: [null, [Validators.required, Validators.min(0)]],
    rate: [null, [Validators.required, Validators.min(0.01), Validators.max(100)]],
    years: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
  });

  result = signal<{
    finalBalance: number;
    totalContributed: number;
    totalInterest: number;
    yearlyProjection: { year: number; balance: number }[];
  } | null>(null);

  calculate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { initial, monthly, rate, years } = this.form.value as unknown as {
      initial: number;
      monthly: number;
      rate: number;
      years: number;
    };
    const r = rate / 100 / 12;
    const n = years * 12;

    // Future value: FV = PV*(1+r)^n + PMT * [((1+r)^n - 1) / r]
    const fvInitial = initial * Math.pow(1 + r, n);
    const fvMonthly = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
    const finalBalance = fvInitial + fvMonthly;
    const totalContributed = initial + monthly * n;
    const totalInterest = finalBalance - totalContributed;

    const yearlyProjection = Array.from({ length: years }, (_, i) => {
      const mo = (i + 1) * 12;
      const fvI2 = initial * Math.pow(1 + r, mo);
      const fvM2 = r === 0 ? monthly * mo : monthly * ((Math.pow(1 + r, mo) - 1) / r);
      return { year: i + 1, balance: fvI2 + fvM2 };
    });

    this.result.set({ finalBalance, totalContributed, totalInterest, yearlyProjection });
  }

  fmt(v: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);
  }

  barWidth(v: number, max: number): string {
    return `${Math.round((v / max) * 100)}%`;
  }
}
