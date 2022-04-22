
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const numberPattern = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/

const schemaCreateContact = Joi.object({
   name: Joi.string()
    .pattern(namePattern)   
    .min(3)
        .max(30)
    .required(),
    
   email: Joi.string()
     .pattern(emailPattern),
     
      
  phone: Joi.string()
    .pattern(numberPattern)
    .required(),
  favorite: Joi.boolean(),

    
})


const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(namePattern)
    .min(3)
    .max(30),
 
  email: Joi.string()
    .pattern(emailPattern),
   

  phone: Joi.string()
    .pattern(numberPattern),
    fovorite: Joi.boolean(),


})

const schemaMongoId = Joi.object({
  contactId: Joi.objectId().required(),
})

const schemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),

}).messages({"message":"missing field favorite"})





module.exports = { schemaCreateContact, schemaUpdateContact, schemaMongoId, schemaFavorite }


