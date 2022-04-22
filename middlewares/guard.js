const jwt = require('jsonwebtoken');
const Users = require('../repository/users');
const { HTTP_STATUS_CODES } = require('../libs/constants');

const SECRET_KEY = process.env.SECRET_KEY;


const guard = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1];
    const isValidToken = verifyToken(token);
    if (!isValidToken) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
            status: 'error',
            message: 'not authorized',
            code: HTTP_STATUS_CODES.UNAUTHORIZED,
        });
    }
    const payload = jwt.decode(token);
    const user = await Users.findById({ _id: payload.id });
    if (!user || user.token !== token) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
            status: 'error',
            message: 'not authorized',
            code: HTTP_STATUS_CODES.UNAUTHORIZED,
        });
    }

    req.user = user;
    next();
};
const verifyToken = (token) => {
    try {
        const t = jwt.verify(token, SECRET_KEY);
        return !!t;
    } catch (error) {
        return false;
    }
}

module.exports =  guard ;



