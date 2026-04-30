import { Component, signal, computed } from '@angular/core';

const RTE_CDT_DEFAULT = 4; // % Art. 395 ET — rendimientos financieros

export interface MesRow {
  mes: number;
  saldoInicial: number;
  rendBruto: number;
  descuento: number;      // retención CDT o impuesto negocio
  saldoFinal: number;
}

@Component({
  selector: 'app-cdt-negocio',
  standalone: true,
  imports: [],
  templateUrl: './cdt-negocio.component.html',
})
export class CdtNegocioComponent {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  capitalRaw      = signal(10_000_000);
  tasaCDT         = signal(13.5);       // % EA
  retencionCDT    = signal(RTE_CDT_DEFAULT); // % sobre cada rendimiento mensual
  tasaNegocio     = signal(2.5);        // % mensual
  impuestoNegocio = signal(0);          // % estimado sobre utilidad mensual (opcional)
  plazo           = signal(12);         // meses

  readonly capitalDisplay = computed(() =>
    this.capitalRaw() > 0 ? new Intl.NumberFormat('es-CO').format(this.capitalRaw()) : ''
  );

  // ── Proyección mensual ───────────────────────────────────────────────────────
  readonly rowsCDT = computed<MesRow[]>(() => {
    const C     = this.capitalRaw();
    const rte   = this.retencionCDT() / 100;
    const monthly = Math.pow(1 + this.tasaCDT() / 100, 1 / 12) - 1;
    const rows: MesRow[] = [];
    let saldo = C;
    for (let m = 1; m <= this.plazo(); m++) {
      const rendBruto  = saldo * monthly;
      const descuento  = rendBruto * rte;
      const saldoFinal = saldo + rendBruto - descuento;
      rows.push({ mes: m, saldoInicial: saldo, rendBruto, descuento, saldoFinal });
      saldo = saldoFinal;
    }
    return rows;
  });

  readonly rowsNegocio = computed<MesRow[]>(() => {
    const C    = this.capitalRaw();
    const rate = this.tasaNegocio() / 100;
    const imp  = this.impuestoNegocio() / 100;
    const rows: MesRow[] = [];
    let saldo = C;
    for (let m = 1; m <= this.plazo(); m++) {
      const rendBruto  = saldo * rate;
      const descuento  = rendBruto * imp;
      const saldoFinal = saldo + rendBruto - descuento;
      rows.push({ mes: m, saldoInicial: saldo, rendBruto, descuento, saldoFinal });
      saldo = saldoFinal;
    }
    return rows;
  });

  // ── Resumen ──────────────────────────────────────────────────────────────────
  readonly result = computed(() => {
    const C           = this.capitalRaw();
    const cdtRows     = this.rowsCDT();
    const negocioRows = this.rowsNegocio();

    const cdtFinalNeto      = cdtRows.at(-1)?.saldoFinal ?? C;
    const cdtRendBruto      = cdtRows.reduce((s, r) => s + r.rendBruto, 0);
    const cdtRetencion      = cdtRows.reduce((s, r) => s + r.descuento, 0);
    const cdtRendNeto       = cdtFinalNeto - C;

    const negocioFinalNeto  = negocioRows.at(-1)?.saldoFinal ?? C;
    const negocioRendBruto  = negocioRows.reduce((s, r) => s + r.rendBruto, 0);
    const negocioImpuesto   = negocioRows.reduce((s, r) => s + r.descuento, 0);
    const negocioRendNeto   = negocioFinalNeto - C;

    const cdtWins   = cdtRendNeto >= negocioRendNeto;
    const diferencia = Math.abs(cdtRendNeto - negocioRendNeto);
    const negocioEA = (Math.pow(1 + this.tasaNegocio() / 100, 12) - 1) * 100;

    return {
      cdtFinalNeto, cdtRendBruto, cdtRetencion, cdtRendNeto,
      negocioFinalNeto, negocioRendBruto, negocioImpuesto, negocioRendNeto,
      cdtWins, diferencia, negocioEA,
    };
  });

  // ── Helpers ──────────────────────────────────────────────────────────────────
  onCapitalInput(e: Event): void {
    const el = e.target as HTMLInputElement;
    const n  = parseInt(el.value.replace(/\D/g, ''), 10) || 0;
    this.capitalRaw.set(n);
    el.value = n > 0 ? new Intl.NumberFormat('es-CO').format(n) : '';
  }

  fmt(v: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP',
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(v);
  }
  fmtPct(v: number): string { return v.toFixed(2) + '%'; }
}
