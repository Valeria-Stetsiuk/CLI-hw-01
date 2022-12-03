const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await contacts.listContacts();
      console.table(JSON.parse(listOfContacts));
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table("new contact", newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table("Removed contact", removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
