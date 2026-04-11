import { Component } from '@angular/core';
import { CONTACT_INFO } from '../../../config/content.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly contact = CONTACT_INFO;
  readonly year = new Date().getFullYear();

  readonly quickLinks = [
    { label: 'Servicios', anchor: 'servicios' },
    { label: 'Sobre mí', anchor: 'sobre-mi' },
    { label: 'Preguntas frecuentes', anchor: 'faq' },
    { label: 'Contacto', anchor: 'contacto' },
  ];

  readonly services = [
    'Contabilidad Integral',
    'Declaración de Renta',
    'Asesoría Tributaria',
    'Planeación Financiera',
    'Nómina y RRHH',
    'Constitución de Empresas',
  ];

  scrollTo(anchor: string): void {
    const el = document.getElementById(anchor);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  get whatsappUrl(): string {
    return `https://wa.me/${this.contact.whatsapp.number}?text=${encodeURIComponent(this.contact.whatsapp.message)}`;
  }
}
