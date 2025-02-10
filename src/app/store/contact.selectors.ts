import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './contact.reducer';

export const selectContactsState = createFeatureSelector<State>('contacts');

export const selectAllContacts = createSelector(
  selectContactsState,
  (state: State) => state.contacts
);

export const selectSelectedContact = createSelector(
  selectContactsState,
  (state: State) => state.selectedContact
);
