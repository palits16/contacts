import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddUpdateComponent } from './contact-add-update/contact-add-update.component';

const routes: Routes = [
  { path: 'list', component: ContactListComponent },
  { path: 'add', component: ContactAddUpdateComponent },
  { path: 'update/:id', component: ContactAddUpdateComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {}