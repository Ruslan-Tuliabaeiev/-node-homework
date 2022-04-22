const Contact = require('../models/contact')

async function getContacts(query, user) {
    const result = await Contact.find({owner: user.id})

    return result
}

async function getContactById(contactId, user ) {
    const result = await Contact.findById({_id: contactId, owner: user.id})
    return result
}
 
const createContact = async (body, user) => {
    const result = await Contact.findOne({...body , owner: user.id})
    return result
}

async function updateContact(contactId, body, user  ) {
    const result = await Contact.findOneAndUpdate({_id:contactId, owner: user.id}, {...body}, {new: true})
    return result
}

async function deleteContact(contactId, user) {
    const result = await Contact.findOneAndRemove({ _id: contactId, owner: user.id })
    return result
}

async function updateFavorite(contactId, body, user ) {
    const result = await Contact.findByIdAndUpdate({ _id: contactId , owner: user.id}, {...body}, {new: true})
    return result
}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateFavorite
}




