import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { SERVICES } from '../../../../config/content.config';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  readonly services = SERVICES;
}
