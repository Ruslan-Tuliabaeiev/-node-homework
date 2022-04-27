const express = require('express');
const { wrapper: wrapperError } = require('../../../middlewares/error-handler');
const { currentUser, avatarUser}  = require('../../../controllers/user');
const auth = require('../../../middlewares/auth');
const guard = require('../../../middlewares/guard')

const upload = require('../../../middlewares/upload')

const router = express.Router();

router.patch('/avatar', guard, upload.single('avatar'), wrapperError(avatarUser))

router.get('/current', auth, wrapperError(currentUser));
module.exports = router;
 




