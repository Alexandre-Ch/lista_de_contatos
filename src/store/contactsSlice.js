import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [
    { id: 1, fullName: 'Ana Silva', email: 'ana@email.com', phone: '(11) 99999-1111' },
    { id: 2, fullName: 'Bruno Costa', email: 'bruno@email.com', phone: '(21) 98888-2222' }
  ]
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push({ id: Date.now(), ...action.payload });
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    editContact: (state, action) => {
      const { id, ...updatedContact } = action.payload;
      state.contacts = state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      );
    }
  }
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
