import { Component, signal, computed } from '@angular/core';

const RET_TABLE = [
  { name: 'Compras (obligado declarar)', rate: 2.5, baseMin: 524_000 },
  { name: 'Compras (no obligado)', rate: 3.5, baseMin: 524_000 },
  { name: 'Servicios generales', rate: 4, baseMin: 104_748 },
  { name: 'Honorarios (PJ)', rate: 11, baseMin: 0 },
  { name: 'Honorarios (PN)', rate: 10, baseMin: 0 },
  { name: 'Arrendamiento inmueble (PN)', rate: 3.5, baseMin: 0 },
  { name: 'Arrendamiento inmueble (PJ)', rate: 4, baseMin: 0 },
  { name: 'Sin retención', rate: 0, baseMin: 0 },
];

const IVA_OPTS = [
  { label: '19% — Tarifa general', rate: 19 },
  { label: '5% — Tarifa diferencial', rate: 5 },
  { label: '0% — Exento / Excluido', rate: 0 },
];

const RETEIVA_OPTS = [
  { label: '15% — Residentes (Art. 437-1 ET)', rate: 15 },
  { label: '100% — No residentes / no domiciliados', rate: 100 },
  { label: '0% — Sin Reteiva', rate: 0 },
];

@Component({
  selector: 'app-iva-retencion',
  standalone: true,
  imports: [],
  templateUrl: './iva-retencion.component.html',
})
export class IvaRetencionComponent {
  readonly retTable = RET_TABLE;
  readonly ivaOpts = IVA_OPTS;
  readonly reteIvaOpts = RETEIVA_OPTS;

  valorRaw = signal(0);
  ivaIncluido = signal(false);
  ivaRate = signal(19);
  retIdx = signal(0);
  reteivaPct = signal(15);
  reteicaPorMil = signal(0);

  readonly valorDisplay = computed(() =>
    this.valorRaw() > 0 ? new Intl.NumberFormat('es-CO').format(this.valorRaw()) : ''
  );

  readonly result = computed(() => {
    const v = this.valorRaw();
    const ivaFrac = this.ivaRate() / 100;
    const base = this.ivaIncluido() ? v / (1 + ivaFrac) : v;
    const iva = base * ivaFrac;
    const subtotal = base + iva;

    const ret = this.retTable[this.retIdx()] ?? this.retTable[this.retTable.length - 1];
    const retencion = ret.rate > 0 && base >= ret.baseMin ? base * (ret.rate / 100) : 0;
    const reteiva = iva * (this.reteivaPct() / 100);
    const reteica = base * (this.reteicaPorMil() / 1000);
    const neto = subtotal - retencion - reteiva - reteica;

    return { base, iva, subtotal, retencion, reteiva, reteica, neto };
  });

  onValorInput(e: Event): void {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '');
    const n = digits ? parseInt(digits, 10) : 0;
    this.valorRaw.set(n);
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

  fmtMin(v: number): string {
    return v === 0 ? 'Cualquier valor' : this.fmt(v);
  }
}
