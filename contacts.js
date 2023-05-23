const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// File path
const contactsPath = path.join(__dirname, "db", "contacts.json");

// getContacts from json
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    ...name,
    ...email,
    ...phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
