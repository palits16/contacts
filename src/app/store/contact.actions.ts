import { Contact } from '../models/contact.model';
import { createAction, props } from '@ngrx/store';

export const addContact = createAction(
  '[Contact] Add Contact',
  props<{ contact: Contact }>()
);

export const updateContact = createAction(
  '[Contact] Update Contact',
  props<{ contact: Contact }>()
);

export const deleteContact = createAction(
  '[Contact] Delete Contact',
  props<{ id: string }>()
);

export const loadContacts = createAction('[Contact] Load Contacts');
export const loadContactsSuccess = createAction(
  '[Contact] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

export const getContactById = createAction(
  '[Contact] Get Contact By ID',
  props<{ id: string }>()
);
