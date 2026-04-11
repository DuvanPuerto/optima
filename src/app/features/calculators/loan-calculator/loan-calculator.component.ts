import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyInputDirective } from '../../../shared/directives/currency-input.directive';

interface AmortizationRow {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyInputDirective],
  templateUrl: './loan-calculator.component.html',
})
export class LoanCalculatorComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    amount: [null, [Validators.required, Validators.min(1)]],
    rate: [null, [Validators.required, Validators.min(0.01), Validators.max(200)]],
    term: [null, [Validators.required, Validators.min(1), Validators.max(360)]],
  });

  result = signal<{ monthly: number; total: number; interest: number } | null>(null);
  amortization = signal<AmortizationRow[]>([]);
  showTable = signal(false);

  calculate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { amount, rate, term } = this.form.value as unknown as {
      amount: number;
      rate: number;
      term: number;
    };
    const r = rate / 100 / 12;
    const n = term;
    const monthly =
      r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - amount;
    this.result.set({ monthly, total, interest });

    // Build amortization table
    const rows: AmortizationRow[] = [];
    let balance = amount;
    for (let i = 1; i <= n; i++) {
      const interestPmt = balance * r;
      const principalPmt = monthly - interestPmt;
      balance -= principalPmt;
      rows.push({
        period: i,
        payment: monthly,
        principal: principalPmt,
        interest: interestPmt,
        balance: Math.max(0, balance),
      });
    }
    this.amortization.set(rows);
    this.showTable.set(false);
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
