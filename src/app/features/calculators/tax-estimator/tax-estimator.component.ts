import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyInputDirective } from '../../../shared/directives/currency-input.directive';
import { UVT_VALUE, TAX_TABLE_NATURAL, TAX_RATE_JURIDICA } from '../../../config/tax-tables.config';

@Component({
  selector: 'app-tax-estimator',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyInputDirective],
  templateUrl: './tax-estimator.component.html',
})
export class TaxEstimatorComponent {
  readonly uvt = UVT_VALUE;

  private fb = inject(FormBuilder);

  form = this.fb.group({
    income: [null, [Validators.required, Validators.min(1)]],
    personType: ['natural', Validators.required],
    deductions: [null, [Validators.required, Validators.min(0)]],
  });

  result = signal<{
    grossIncome: number;
    deductions: number;
    taxableIncome: number;
    taxableUvt: number;
    estimatedTax: number;
    effectiveRate: number;
    personType: string;
  } | null>(null);

  calculate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { income, personType, deductions } = this.form.value as unknown as {
      income: number;
      personType: string;
      deductions: number;
    };
    const taxableIncome = Math.max(0, income - deductions);
    const taxableUvt = taxableIncome / this.uvt;
    let estimatedTax = 0;

    if (personType === 'natural') {
      for (const bracket of TAX_TABLE_NATURAL) {
        if (taxableUvt > bracket.from) {
          const excess =
            Math.min(taxableUvt, bracket.to === Infinity ? taxableUvt : bracket.to) - bracket.from;
          estimatedTax = bracket.base * this.uvt + excess * bracket.rate * this.uvt;
        }
      }
    } else {
      estimatedTax = taxableIncome * TAX_RATE_JURIDICA;
    }

    const effectiveRate = income > 0 ? (estimatedTax / income) * 100 : 0;
    this.result.set({
      grossIncome: income,
      deductions,
      taxableIncome,
      taxableUvt,
      estimatedTax,
      effectiveRate,
      personType,
    });
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
    return `${v.toFixed(2)}%`;
  }

  fmtUvt(v: number): string {
    return `${v.toFixed(2)} UVT`;
  }
}
