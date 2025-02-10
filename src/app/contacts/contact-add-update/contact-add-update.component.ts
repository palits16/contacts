import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import {
  addContact,
  getContactById,
  updateContact,
} from '../../store/contact.actions';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Contact } from '../../models/contact.model';
import { selectSelectedContact } from '../../store/contact.selectors';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-add-update',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-add-update.component.html',
  styleUrl: './contact-add-update.component.scss',
})
export class ContactAddUpdateComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject();
  contactForm: FormGroup;
  contactId!: string;
  isAddOrUpdate: 'Add' | 'Update' = 'Add';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      dob: [null, [Validators.required, this.dateValidator]],
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id') || '';
    this.isAddOrUpdate = this.contactId === '' ? 'Add' : 'Update';
    this.loadContact(this.contactId);
  }

  loadContact(id?: string): void {
    if (!id) return;
    this.store.dispatch(getContactById({ id }));
    this.store
      .select(selectSelectedContact)
      .pipe(takeUntil(this.destroy))
      .subscribe((contact: Contact | null) => {
        if (contact) {
          this.populateContactForm(contact);
        } else {
          this.handleContactNotFound();
        }
      });
  }

  private populateContactForm(contact: Contact): void {
    const contactValue: any = {
      firstname: contact.firstname,
      surname: contact.surname,
      dob: new Date(contact.dob as string),
    };
    this.contactForm.patchValue(contactValue);
  }

  private handleContactNotFound(): void {
    console.error('Contact not found');
  }


  private generateId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }

  dateValidator(control: AbstractControl) {
    const date = new Date(control.value);
    const centuryStart = new Date('2000-01-01');
    return date >= centuryStart ? null : { invalidDate: true };
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact = this.createContactObject();
      if (this.isAddOrUpdate === 'Add') {
        this.store.dispatch(addContact({ contact }));
      } else {
        this.store.dispatch(updateContact({ contact }));
      }

      this.router.navigate(['/contact/list']);
    }
  }

  private createContactObject(): Contact {
    return {
      id: this.isAddOrUpdate === 'Add' ? this.generateId() : this.contactId,
      ...this.contactForm.value,
    };
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
