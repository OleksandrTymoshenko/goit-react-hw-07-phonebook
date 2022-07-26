import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { nanoid } from 'nanoid';

const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const contacts = await axios('https://62dfa0389c47ff309e89cb7b.mockapi.io/contacts/contacts').then(
    res => res.data
  );
  return contacts;
});

const addContacts = createAsyncThunk(
  'contacts/add',
  async ({ name, phone }) => {
    await axios.post('https://62dfa0389c47ff309e89cb7b.mockapi.io/contacts/contacts', {
      id: nanoid(),
      name,
      phone,
    });
  }
);

const deleteContacts = createAsyncThunk('contacts/delete', async id => {
  await axios.delete(`https://62dfa0389c47ff309e89cb7b.mockapi.io/contacts/contacts/${id}`);
});

const filterName = createAction('contacts/filterName');

// eslint-disable-next-line import/no-anonymous-default-export
export default { addContacts, deleteContacts, filterName, fetchContacts };
