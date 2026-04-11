import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { ABOUT_CONTENT } from '../../../../config/content.config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly about = ABOUT_CONTENT;
}
