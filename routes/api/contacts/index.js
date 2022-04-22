const express = require('express')
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  updateFavorite,
} = require('../../../controllers/contacts')
const { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite } = require('./contacts-validation-schems') 
const {validateBody, validateParams} = require('../../../middlewares/validation')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const guard = require('../../../middlewares/guard')
 const router = express.Router()

router.get('/', guard, getContacts)
router.get('/:contactId', guard, validateParams(schemaMongoId), wrapperError(getContactById))
router.post('/', guard, validateBody(schemaCreateContact), wrapperError(createContact))
router.put('/:contactId', guard, validateParams(schemaMongoId), validateBody(schemaUpdateContact), wrapperError(updateContact))
router.delete('/:contactId', guard, validateParams(schemaMongoId), wrapperError(deleteContact))
router.put('/:contactId/favorite', guard, validateParams(schemaMongoId), validateBody(schemaFavorite), wrapperError(updateFavorite))



module.exports = router
