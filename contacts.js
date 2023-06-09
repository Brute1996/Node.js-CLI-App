// import fs from "fs/promises";
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const findedContact = contactsList.find(
    (contact) => contact.id === contactId
  );
  return findedContact || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const removedContactInex = contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (removedContactInex === -1) return null;

  const [removedContact] = contactsList.splice(removedContactInex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  console.log(removedContact);
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  console.log(newContact);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
