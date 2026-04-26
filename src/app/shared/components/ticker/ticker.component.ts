import { Component } from '@angular/core';

interface TickerItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-ticker',
  standalone: true,
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
})
export class TickerComponent {
  readonly items: TickerItem[] = [
    { label: 'Smmlv 2026', value: '$1.750.905' },
    { label: 'UVT 2026', value: '$52.374' },
    { label: 'Aux. Transporte', value: '$249.095' },
    { label: 'IPC 2025', value: '5,10%' },
    { label: 'Renta jurídicas', value: '35%' },
    { label: 'IVA general', value: '19%' },
    { label: 'Sanción mínima', value: '$524.000' },
    { label: 'Mora DIAN', value: '22,36% EA' },
    { label: 'Pensión mujeres', value: '1.275 sem · 57 años' },
    { label: 'Pensión hombres', value: '1.300 sem · 62 años' },
    { label: 'Reteiva', value: '15%' },
    { label: 'Dec. 2343/2025', value: 'Smmlv oficial' },
  ];

  // Duplicate items so the loop appears seamless
  readonly allItems = [...this.items, ...this.items];
}
