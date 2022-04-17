const express = require('express')
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateFavorite,
} = require('../../controllers/contacts')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('./contacts-validation-schems') 
const {validateBody, validateParams} = require('../../middlewars/validation')

 const router = express.Router()

router.get('/', getContacts)
router.get('/:contactId', validateParams(schemaMongoId), getContactById)
router.post('/', validateBody(schemaCreateContact), createContact)
router.put('/:contactId', validateParams(schemaMongoId), validateBody(schemaUpdateContact), updateContact)
router.delete('/:contactId', validateParams(schemaMongoId), deleteContact)
router.put('/:contactId/favorite', validateParams(schemaMongoId), validateBody(schemaFavorite), updateFavorite)



module.exports = router
