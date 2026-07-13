import { describe, it, expect } from 'vitest';
import reducer, { addContact, removeContact, editContact } from './contactsSlice';

describe('contacts reducer', () => {
  it('adiciona um novo contato', () => {
    const state = reducer({ contacts: [] }, addContact({ fullName: 'Maria', email: 'maria@email.com', phone: '123' }));
    expect(state.contacts).toHaveLength(1);
    expect(state.contacts[0].fullName).toBe('Maria');
  });

  it('edita e remove um contato', () => {
    let state = reducer({ contacts: [{ id: 1, fullName: 'Joao', email: 'joao@email.com', phone: '321' }] }, editContact({ id: 1, fullName: 'João', email: 'joao@email.com', phone: '321' }));
    expect(state.contacts[0].fullName).toBe('João');

    state = reducer(state, removeContact(1));
    expect(state.contacts).toHaveLength(0);
  });
});
