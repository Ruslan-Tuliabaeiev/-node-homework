
const express = require('express')
const { registration,
    login,
    logout,
    verifyUser,
    reverifyEmail,
} = require('../../../controllers/auth')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const guard = require('../../../middlewares/guard')
const router = express.Router()
 

router.post('/registration', wrapperError(registration))
router.post('/login', wrapperError(login))
router.post('/logout', guard, wrapperError(logout))
   
router.get('/verify-email/:token', wrapperError(verifyUser))
router.post('/verify-email', wrapperError(reverifyEmail))

module.exports = router




