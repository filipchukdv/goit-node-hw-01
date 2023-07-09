import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import yargs from "yargs";

const { argv } = yargs(process.argv.slice(2));

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.log(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      return console.log(addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
