const Contact = require('../../models/contact')

async function getContacts() {
    const contacts = await Contact.find()
    return contacts
}

async function getContactById(contactId) {
    const contact = await Contact.findById(contactId)
    return contact
}
 
const createContact = async (body) => {
    const newContact = await Contact.create(body)
    return newContact
}

async function updateContact(contactId, body) {
    const contact = await Contact.findByIdAndUpdate({_id:contactId}, {...body})
    return contact
}

async function deleteContact(contactId) {
    const contact = await Contact.findByIdAndDelete({ _id: contactId })
    return contact
}

async function updateFavorite(contactId, body ) {
    const contact = await Contact.findByIdAndUpdate({ _id: contactId }, {...body})
    return contact
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateFavorite
}




