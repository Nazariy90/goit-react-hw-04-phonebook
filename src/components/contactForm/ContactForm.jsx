import React from 'react';
import css from '../app.module.css';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { onAddContact } = this.props;
    const { name, number } = this.state;

    const handleAddContact = () => {
      onAddContact({ name, number });
      this.setState({ name: '', number: '' });
    };

    return (
      <form>
        <h2 className={css.title}>Name</h2>
        <label>
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={this.handleChange}
            required
          />
        </label>
        <h2 className={css.title}>Number</h2>
        <label>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={this.handleChange}
            required
          />
        </label>

        <button
          type="button"
          className={css.button}
          onClick={handleAddContact}
          disabled={!name || !number}
        >
          Add contact
        </button>
      </form>
    );
  }
}
