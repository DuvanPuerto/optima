import { Component, HostListener, signal, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CONTACT_INFO } from '../../../config/content.config';

interface NavLink {
  label: string;
  anchor?: string;
  route?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly whatsapp = CONTACT_INFO.whatsapp;
  isScrolled = signal(false);
  menuOpen = signal(false);

  private pendingAnchor: string | null = null;
  private router = inject(Router);

  readonly navLinks: NavLink[] = [
    { label: 'Inicio', anchor: 'hero' },
    { label: 'Servicios', anchor: 'servicios' },
    { label: 'Sobre mí', anchor: 'sobre-mi' },
    { label: 'Calculadoras', route: '/calculadoras' },
    { label: 'Preguntas', anchor: 'faq' },
    { label: 'Contacto', anchor: 'contacto' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 40);
  }

  scrollTo(anchor: string): void {
    this.menuOpen.set(false);
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // On a sub-page: navigate home then scroll once the home sections are rendered
      this.pendingAnchor = anchor;
      this.router.navigate(['/']).then(() => {
        this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
          if (this.pendingAnchor) {
            setTimeout(() => {
              document
                .getElementById(this.pendingAnchor!)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              this.pendingAnchor = null;
            }, 80);
          }
        });
      });
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  get whatsappUrl(): string {
    return `https://wa.me/${this.whatsapp.number}?text=${encodeURIComponent(this.whatsapp.message)}`;
  }
}
