import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'contact', loadChildren: () => import('./contacts/contacts-routing.module').then(m => m.ContactsRoutingModule) },
  { path: '', redirectTo: '/contact/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/contact/list' }
];
