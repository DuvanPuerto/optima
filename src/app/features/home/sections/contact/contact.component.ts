import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollAnimateDirective } from '../../../../core/directives/scroll-animate.directive';
import { CONTACT_INFO, FORMSPREE_ENDPOINT } from '../../../../config/content.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollAnimateDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly contact = CONTACT_INFO;
  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  private sanitizer = inject(DomSanitizer);

  readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://maps.google.com/maps?q=Paipa,+Boyac%C3%A1,+Colombia&t=&z=13&ie=UTF8&iwloc=&output=embed',
  );

  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(this.form.value),
      });
      this.status.set(res.ok ? 'success' : 'error');
      if (res.ok) this.form.reset();
    } catch {
      this.status.set('error');
    }
  }

  hasError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  get whatsappUrl(): string {
    const { number, message } = this.contact.whatsapp;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
}
