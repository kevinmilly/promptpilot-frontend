import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Compare } from './features/compare/compare';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'compare', component: Compare },
  { path: '**', redirectTo: '' }
];

export const appRouting = [
  provideRouter(routes)
];
