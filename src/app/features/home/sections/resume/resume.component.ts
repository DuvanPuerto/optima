import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { RESUME_CONTENT } from '../../../../config/content.config';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './resume.component.html',
})
export class ResumeComponent {
  readonly resume = RESUME_CONTENT;
}
