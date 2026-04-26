import { Component, signal, computed } from '@angular/core';

// Rangos de matrícula Cámara de Comercio 2026 para SAS (aproximados)
const MATRICULA_TABLA = [
  { max: 4_370_000, fee: 177_000 },
  { max: 7_280_000, fee: 214_000 },
  { max: 10_920_000, fee: 266_000 },
  { max: 14_560_000, fee: 319_000 },
  { max: 21_840_000, fee: 398_000 },
  { max: 36_400_000, fee: 531_000 },
  { max: 54_600_000, fee: 709_000 },
  { max: 109_200_000, fee: 1_063_000 },
  { max: Infinity, fee: 2_800_000 },
];

const PASOS = [
  {
    icon: 'fa-solid fa-magnifying-glass',
    title: 'Verificar nombre en RUES',
    desc: 'Confirma la disponibilidad del nombre en el portal rues.org.co antes de continuar.',
    link: 'https://www.rues.org.co',
    linkLabel: 'Ir a RUES',
  },
  {
    icon: 'fa-solid fa-file-signature',
    title: 'Redactar acto de constitución',
    desc: 'Documento privado con los estatutos de la SAS: nombre, objeto, capital, administración y término.',
    link: '',
    linkLabel: '',
  },
  {
    icon: 'fa-solid fa-store',
    title: 'Registro en Cámara de Comercio',
    desc: 'Presentar documentos en ventanilla o portal virtual. Pagar matrícula y derechos de registro RUES.',
    link: 'https://www.ccb.org.co',
    linkLabel: 'Portal CCB',
  },
  {
    icon: 'fa-solid fa-id-card',
    title: 'Obtener Pre-RUT y NIT',
    desc: 'La Cámara de Comercio gestiona el Pre-RUT ante la DIAN. El NIT es asignado en ese momento.',
    link: '',
    linkLabel: '',
  },
  {
    icon: 'fa-solid fa-building-columns',
    title: 'Abrir cuenta bancaria empresarial',
    desc: 'Con el certificado de existencia y el NIT, solicita la cuenta corriente o de ahorros de la empresa.',
    link: '',
    linkLabel: '',
  },
  {
    icon: 'fa-solid fa-file-invoice',
    title: 'Actualizar RUT definitivo en DIAN',
    desc: 'Con el NIT asignado, actualiza el RUT con las actividades económicas (CIIU) y responsabilidades.',
    link: 'https://www.dian.gov.co',
    linkLabel: 'Portal DIAN',
  },
  {
    icon: 'fa-solid fa-receipt',
    title: 'Habilitación de factura electrónica',
    desc: 'Si superas los umbrales de ingresos o por tipo de actividad, tramita la habilitación en la DIAN.',
    link: '',
    linkLabel: '',
  },
  {
    icon: 'fa-solid fa-users',
    title: 'Registro laboral y parafiscales',
    desc: 'Afiliación a ARL, caja de compensación, SENA e ICBF según el número de empleados.',
    link: '',
    linkLabel: '',
  },
];

@Component({
  selector: 'app-crear-empresa',
  standalone: true,
  imports: [],
  templateUrl: './crear-empresa.component.html',
})
export class CrearEmpresaComponent {
  readonly pasos = PASOS;
  capitalRaw = signal(5_000_000);

  readonly capitalDisplay = computed(() =>
    this.capitalRaw() > 0 ? new Intl.NumberFormat('es-CO').format(this.capitalRaw()) : ''
  );

  readonly fees = computed(() => {
    const C = this.capitalRaw();
    const row = MATRICULA_TABLA.find((t) => C <= t.max) ?? MATRICULA_TABLA[MATRICULA_TABLA.length - 1];
    const matricula = row.fee;
    const rues = 64_000;
    const certificado = 15_000;
    const total = matricula + rues + certificado;
    return { matricula, rues, certificado, total };
  });

  onCapitalInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.capitalRaw.set(n);
    (e.target as HTMLInputElement).value = n > 0 ? new Intl.NumberFormat('es-CO').format(n) : '';
  }

  fmt(v: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);
  }
}
