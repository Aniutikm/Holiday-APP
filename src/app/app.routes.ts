import { Routes } from '@angular/router';
import { CountryComponent } from './pages/country/country.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'country/:code', component: CountryComponent }, // Placeholder for the Country Page
  { path: '**', redirectTo: '' },
];
