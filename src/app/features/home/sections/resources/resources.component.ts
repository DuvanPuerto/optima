import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { RESOURCES } from '../../../../config/content.config';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './resources.component.html',
})
export class ResourcesComponent {
  readonly resources = RESOURCES;
}
