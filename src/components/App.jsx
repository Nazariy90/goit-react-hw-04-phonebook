import React from 'react';
import { nanoid } from 'nanoid';
import { Filter } from './filter/Filter';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';

// export const App = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState('');
// };

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  //   useEffect(() => {
  //     const storedContacts = localStorage.getItem('contacts');
  //     if (storedContacts) {
  //       setContacts(JSON.parse(storedContacts));
  //   }
  // }, []);

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  // useEffect(() => {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  // },[contacts])

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleAddContact = ({ name, number }) => {
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    if (name.trim() && number.trim()) {
      const newContact = { id: nanoid(), name, number };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  handleDeleteContact = ({ id }) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
