import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const moviesPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(moviesPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(moviesPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(moviesPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
