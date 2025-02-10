import { Contact } from '../models/contact.model';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { addContact, updateContact, deleteContact, loadContactsSuccess, getContactById } from './contact.actions';


export interface State {
  contacts: Contact[];
  selectedContact: Contact | null;
  error: any;
}

export const initialState: State = {
  contacts: [],
  selectedContact: {
    id: '',
    firstname: '',
    surname: '',
    dob: ''
  },
  error: null

};

const _contactReducer: ActionReducer<State, Action<string>> = createReducer(
  initialState,
  on(loadContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
  on(addContact, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
  })),
  on(updateContact, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(c => (c.id === contact.id ? contact : c)),
  })),
  on(deleteContact, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter(c => c.id !== id),
  })),
  on(getContactById, (state, { id }) => {
    const selectedContact = state.contacts.find(contact => contact.id === id) || null;
    return {
      ...state,
      selectedContact,
      error: null
    };
  }),

);

export function contactReducer(state: any, action: any): State {
  return _contactReducer(state, action);
}