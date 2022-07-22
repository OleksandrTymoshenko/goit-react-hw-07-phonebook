import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/contacts/actions';
import s from './App.module.css';
import Form from '../../07-phonebook/src/components/Form/Form';
import ContactList from '../../07-phonebook/src/components/Contacts/ContactList';
import Filter from '../../07-phonebook/src/components/Filter/Filtet';
import WindowModal from '../../07-phonebook/src/components/Modal/Modal';

function App() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteName, setDeleteName] = useState('');

  useEffect(() => {
    dispatch(actions.fetchContacts());
  }, [dispatch]);

  const onDelete = contactDeleteDId => {
    dispatch(actions.deleteContacts(contactDeleteDId));
    dispatch(actions.fetchContacts());
    setIsOpen(false);
  };

  const dontDelete = () => {
    setIsOpen(false);
    setDeleteName('');
  };

  const removeContact = contactId => {
    setDeleteName(contactId);
    setIsOpen(true);
  };

  return (
    <section className={s.section}>
      <h1> Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <p>Поиск контакта по имени</p>
      <Filter />
      <ContactList
        onRemoveContact={removeContact}
        contacts={contacts}
        filter={filter}
      />
      {isOpen ? (
        <WindowModal
          modalRemove={deleteName}
          dontDelete={dontDelete}
          onDelete={onDelete}
        />
      ) : (
        ''
      )}
    </section>
  );
}
export default App;