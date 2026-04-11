import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * Directiva de animación al hacer scroll.
 * Uso: <div appScrollAnimate> (clase scroll-hidden por defecto)
 *      <div appScrollAnimate="left"> (slide desde la izquierda)
 *      <div appScrollAnimate="right"> (slide desde la derecha)
 *      <div appScrollAnimate="scale"> (zoom in)
 * Agregar clase delay-100..delay-600 para escalonamiento.
 */
@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input('appScrollAnimate') direction: 'up' | 'left' | 'right' | 'scale' | '' = '';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const classMap: Record<string, string> = {
      left: 'scroll-hidden-left',
      right: 'scroll-hidden-right',
      scale: 'scroll-hidden-scale',
      up: 'scroll-hidden',
      '': 'scroll-hidden',
    };
    const hiddenClass = classMap[this.direction] ?? 'scroll-hidden';
    this.el.nativeElement.classList.add(hiddenClass);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
