import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'calculadoras',
    loadComponent: () =>
      import('./features/calculators/calculators.component').then((m) => m.CalculatorsComponent),
  },
  {
    path: 'pqrs',
    loadComponent: () => import('./features/pqrs/pqrs.component').then((m) => m.PqrsComponent),
  },
  { path: '**', redirectTo: '' },
];
