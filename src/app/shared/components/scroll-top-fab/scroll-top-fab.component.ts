import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-top-fab',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        (click)="scrollTop()"
        class="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-none cursor-pointer"
        style="background: var(--primary); color: white;"
        aria-label="Volver arriba"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    }
  `,
})
export class ScrollTopFabComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 400);
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
