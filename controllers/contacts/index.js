const contactsRepository = require('../../repository/contacts');
const {HTTP_STATUS_CODES} = require('../../libs/constants');




const getContacts = async (req, res, next) => {
    const contacts = await contactsRepository.getContacts()
    res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contacts } })
    

}
const getContactById = async (req, res, next) => { 
    const contact = await contactsRepository.getContactById(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })
    } else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODES.NOT_FOUND, message: 'Not Found ' })
    }

}
    
const createContact = async (req, res, next) => {
    const contact = await contactsRepository.createContact(req.body)
    // console.log(contact);
    // console.log(HTTP_STATUS_CODES.CREATED);
    res.status(HTTP_STATUS_CODES.CREATED).json({ status: 'success', code: HTTP_STATUS_CODES.CREATED, payload: {contact } })
}

const updateContact = async (req, res, next) => {
    const contact = await contactsRepository.updateContact(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })
    } else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODES.NOT_FOUND, message: 'Contact Not Found ' })
    }
}

const deleteContact = async (req, res, next) => {
    const contact = await contactsRepository.deleteContact(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })
    } else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODES.NOT_FOUND, message: 'Contact Not Found ' })
    }
}

const updateFavorite = async (req, res, next) => {
    const contact = await contactsRepository.updateFavorite(req.params.contactId)
    if (contact) {
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })
    } else {
        res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ status: 'error', code: HTTP_STATUS_CODES.NOT_FOUND, message: 'Contact Not Found ' })
    }
}






module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateFavorite
}

