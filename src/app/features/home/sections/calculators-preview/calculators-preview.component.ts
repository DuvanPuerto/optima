import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';

@Component({
  selector: 'app-calculators-preview',
  standalone: true,
  imports: [RouterLink, ScrollAnimateDirective],
  templateUrl: './calculators-preview.component.html',
})
export class CalculatorsPreviewComponent {
  readonly tools = [
    {
      icon: 'fa-solid fa-building-columns',
      title: 'Calculadora de Préstamos',
      description: 'Calcula tu cuota mensual, intereses totales y genera tabla de amortización.',
      tag: 'Préstamos',
      color: 'primary',
    },
    {
      icon: 'fa-solid fa-piggy-bank',
      title: 'Calculadora de Ahorro',
      description:
        'Proyecta el crecimiento de tus ahorros con aportes mensuales y tasa de interés.',
      tag: 'Ahorro',
      color: 'accent',
    },
    {
      icon: 'fa-solid fa-file-invoice-dollar',
      title: 'Estimador de Impuesto de Renta',
      description: 'Estima tu impuesto de renta persona natural según la tabla vigente de la DIAN.',
      tag: 'Tributario',
      color: 'secondary',
    },
  ];
}
