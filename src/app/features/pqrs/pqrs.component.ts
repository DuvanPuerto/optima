import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CONTACT_INFO, FORMSPREE_ENDPOINT } from '../../config/content.config';

type PqrsType = 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia';

@Component({
  selector: 'app-pqrs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pqrs.component.html',
})
export class PqrsComponent {
  readonly contact = CONTACT_INFO;
  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  selectedType = signal<PqrsType | null>(null);

  readonly pqrsTypes: { type: PqrsType; icon: string; description: string; color: string }[] = [
    {
      type: 'Petición',
      icon: 'fa-solid fa-envelope-open-text',
      description: 'Solicitud de información, aclaración o documentos',
      color: 'var(--primary)',
    },
    {
      type: 'Queja',
      icon: 'fa-solid fa-comment-slash',
      description: 'Inconformidad con el servicio recibido',
      color: 'var(--error)',
    },
    {
      type: 'Reclamo',
      icon: 'fa-solid fa-triangle-exclamation',
      description: 'Inconformidad con el resultado de un trámite',
      color: 'var(--warning)',
    },
    {
      type: 'Sugerencia',
      icon: 'fa-solid fa-lightbulb',
      description: 'Propuesta de mejora o recomendación',
      color: 'var(--success)',
    },
  ];

  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^\+?[\d\s\-]{7,15}$/)]],
    pqrsType: ['', Validators.required],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
    terms: [false, Validators.requiredTrue],
  });

  selectType(type: PqrsType): void {
    this.selectedType.set(type);
    this.form.patchValue({ pqrsType: type });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    try {
      const payload = { ...this.form.value };
      delete (payload as Record<string, unknown>)['terms'];
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      this.status.set(res.ok ? 'success' : 'error');
      if (res.ok) {
        this.form.reset();
        this.selectedType.set(null);
      }
    } catch {
      this.status.set('error');
    }
  }

  hasError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}
