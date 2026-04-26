import { Component, signal } from '@angular/core';
import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { SavingsCalculatorComponent } from './savings-calculator/savings-calculator.component';
import { TaxEstimatorComponent } from './tax-estimator/tax-estimator.component';
import { IvaRetencionComponent } from './iva-retencion/iva-retencion.component';
import { NominaContratistaComponent } from './nomina-contratista/nomina-contratista.component';
import { CdtNegocioComponent } from './cdt-negocio/cdt-negocio.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { MoraTributariaComponent } from './mora-tributaria/mora-tributaria.component';
import { CalendarioDianComponent } from './calendario-dian/calendario-dian.component';
import { AhorroEnergeticoComponent } from './ahorro-energetico/ahorro-energetico.component';

type Tab =
  | 'iva' | 'nomina' | 'cdt' | 'empresa' | 'mora' | 'calendario' | 'solar'
  | 'loan' | 'savings' | 'tax';

const TABS: { id: Tab; label: string }[] = [
  { id: 'iva',        label: 'IVA y Retención' },
  { id: 'nomina',     label: 'Nómina · Contratista' },
  { id: 'cdt',        label: 'CDT vs. Negocio' },
  { id: 'empresa',    label: 'Crear Empresa' },
  { id: 'mora',       label: 'Mora Tributaria' },
  { id: 'calendario', label: 'Calendario DIAN' },
  { id: 'solar',      label: 'Ahorro Energético' },
  { id: 'loan',       label: 'Préstamos' },
  { id: 'savings',    label: 'Ahorro / CDT' },
  { id: 'tax',        label: 'Impuesto Renta' },
];

@Component({
  selector: 'app-calculators',
  standalone: true,
  imports: [
    LoanCalculatorComponent,
    SavingsCalculatorComponent,
    TaxEstimatorComponent,
    IvaRetencionComponent,
    NominaContratistaComponent,
    CdtNegocioComponent,
    CrearEmpresaComponent,
    MoraTributariaComponent,
    CalendarioDianComponent,
    AhorroEnergeticoComponent,
  ],
  templateUrl: './calculators.component.html',
})
export class CalculatorsComponent {
  readonly tabs = TABS;
  activeTab = signal<Tab>('iva');
}
