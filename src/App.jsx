import { useState, useEffect } from "react";
import Contact from "./components/Contact";
import contactsService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    contactsService.getAll().then((response) => {
      setContacts(response.data);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newContact,
      number: newNumber,
    };
    contactsService.create(contactObject).then((response) => {
      setContacts(contacts.concat(response.data));
      setNewContact("");
      setNewNumber("");
    });
  };
  const handleContactChange = (event) => {
    setNewContact(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <div>
        <form onSubmit={addContact}>
          <input value={newContact} onChange={handleContactChange} />
          <input value={newNumber} onChange={handleNumberChange} />
          <button type="submit">Save Contact</button>
        </form>
      </div>
      <h2>Notes</h2>
      <ul>
        {contacts.map((contact) => (
          <Contact key={contact.name} contact={contact} />
        ))}
        <div>debug: {newContact}</div>
      </ul>
    </div>
  );
};

export default App;
