const contactsService = require('../../service/contacts');
const {HTTP_STATUS_CODES} = require('../../libs/constants');




const getContacts = async (req, res) => {
    const contacts = await contactsService.getContacts(req.query, req.user)
    res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contacts } })
    

}

const getContactById = async (req, res) => { 
    const contact = await contactsService.getContactById(req.params.contactId, req.user)
   
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })


}
    
const createContact = async (req, res) => {
    const contact = await contactsService.createContact(req.body, req.user)
    // console.log(contact);
    // console.log(HTTP_STATUS_CODES.CREATED);
    res.status(HTTP_STATUS_CODES.CREATED).json({ status: 'success', code: HTTP_STATUS_CODES.CREATED, payload: {contact } })
}

const updateContact = async (req, res) => {
    const contact = await contactsService.updateContact(req.params.contactId, req.user)
   
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })

}

const deleteContact = async (req, res) => {
    const contact = await contactsService.deleteContact(req.params.contactId, req.user)
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })
  
}

const updateFavorite = async (req, res) => {
    const contact = await contactsService.updateFavorite(req.params.contactId, req.user)
  
        res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contact } })

}






module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateFavorite
}

