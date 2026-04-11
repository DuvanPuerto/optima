import { Component, signal } from '@angular/core';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { FAQ_ITEMS } from '../../../../config/content.config';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  readonly items = FAQ_ITEMS;
  openIndex = signal<number | null>(null);

  toggle(i: number): void {
    this.openIndex.update((v) => (v === i ? null : i));
  }
}
