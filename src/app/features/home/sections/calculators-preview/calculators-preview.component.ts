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
      icon: 'fa-solid fa-percent',
      title: 'Liquidador IVA y Retención',
      description:
        'Calcula IVA, retención en la fuente, Reteiva y Reteica sobre cualquier operación comercial.',
    },
    {
      icon: 'fa-solid fa-triangle-exclamation',
      title: 'Calculadora Mora DIAN',
      description:
        'Estima los intereses de mora a la tasa vigente 22.36% EA sobre obligaciones tributarias vencidas.',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Nómina vs. Contratista',
      description:
        'Compara el costo real de un empleado frente a un contratista incluyendo seguridad social y retención.',
    },
  ];
}
