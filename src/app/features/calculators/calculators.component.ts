import { Component, signal } from '@angular/core';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { SavingsCalculatorComponent } from './savings-calculator/savings-calculator.component';
import { TaxEstimatorComponent } from './tax-estimator/tax-estimator.component';

type Tab = 'loan' | 'savings' | 'tax';

const TABS: { id: Tab; icon: string; label: string; desc: string }[] = [
  {
    id: 'loan',
    icon: 'fa-solid fa-building-columns',
    label: 'Préstamos',
    desc: 'Cuota y amortización',
  },
  { id: 'savings', icon: 'fa-solid fa-piggy-bank', label: 'Ahorro', desc: 'Proyección de capital' },
  {
    id: 'tax',
    icon: 'fa-solid fa-file-invoice-dollar',
    label: 'Impuesto Renta',
    desc: 'Estimación DIAN',
  },
];

@Component({
  selector: 'app-calculators',
  standalone: true,
  imports: [LoanCalculatorComponent, SavingsCalculatorComponent, TaxEstimatorComponent],
  templateUrl: './calculators.component.html',
})
export class CalculatorsComponent {
  readonly tabs = TABS;
  activeTab = signal<Tab>('loan');
}
