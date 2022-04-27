const { HTTP_STATUS_CODES } = require('../../libs/constants');
const AvatarService = require('../../service/file');
const localStorage = require('../../service/file/local-storege');


const currentUser = async (req, res) => {
    const { email, subscription } = req.user;
    console.log(req.user);
    res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, data: { email, subscription } })
}




const avatarUser = async (req, res, next) => {
    const avatarService = new AvatarService(localStorage, req.file, req.user);
    const urlOfAvatar = await avatarService.updateAvatar()
    res.json({
        status: 'success',
        code: HTTP_STATUS_CODES.OK,

        payload: { avatar: urlOfAvatar }

    });

}
module.exports = {
    currentUser,
    avatarUser
}










