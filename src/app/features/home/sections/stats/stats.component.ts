import { Component, OnInit, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { STATS } from '../../../../config/content.config';

@Component({
  selector: 'app-stats',
  standalone: true,
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit, OnDestroy {
  readonly stats: (typeof STATS[number] & { displayText?: string })[] = STATS as any;
  displayValues: number[] = STATS.map(() => 0);
  private observer!: IntersectionObserver;
  private animated = false;

  @ViewChildren('statCard') statCards!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !this.animated) {
          this.animated = true;
          this.statCards.forEach((card) => card.nativeElement.classList.add('visible'));
          this.stats.forEach((stat, i) => this.animateCount(i, stat.value));
        }
      },
      { threshold: 0.3 },
    );
  }

  ngAfterViewInit(): void {
    this.statCards.forEach((card) => this.observer.observe(card.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCount(index: number, target: number): void {
    const duration = 1800;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValues[index] = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}
