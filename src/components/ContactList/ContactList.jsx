import { ContactListItem } from './ContactListItem/ContactListItem';
import { ContactListContainer } from './ContactList.styled';
import { usePhonebook } from 'redux/phonebookSlice';
import { Notification } from 'components/Notification/Notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getContacts } from 'redux/phonebookOperations';

export const ContactList = () => {
  const { contacts, filter, deleteContact } = usePhonebook();
  const dispatch = useDispatch();

  useEffect(() => {
    const promise = dispatch(getContacts());
    return () => {
      promise.abort();
    };
  }, [dispatch, filter]);

  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = filterContacts();

  return (
    <>
      {contacts.length && visibleContacts.length ? (
        <ContactListContainer>
          {visibleContacts.map(({ id, name, number }) => {
            return (
              <ContactListItem
                key={id}
                id={id}
                name={name}
                number={number}
                deleteContact={deleteContact}
              />
            );
          })}
        </ContactListContainer>
      ) : (
        <Notification message="List is empty" />
      )}
    </>
  );
};
