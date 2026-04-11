import { Component } from '@angular/core';
import { CONTACT_INFO, HERO_CONTENT } from '../../../../config/content.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  readonly hero = HERO_CONTENT;
  readonly contact = CONTACT_INFO;

  get whatsappUrl(): string {
    const { number, message } = this.contact.whatsapp;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  scrollTo(anchor: string): void {
    const el = document.getElementById(anchor);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
