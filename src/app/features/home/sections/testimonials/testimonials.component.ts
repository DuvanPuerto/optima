import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { TESTIMONIALS } from '../../../../config/content.config';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent {
  readonly testimonials = TESTIMONIALS;
  stars = [1, 2, 3, 4, 5];
}
