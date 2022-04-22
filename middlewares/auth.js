/* eslint-disable no-constant-condition */
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CustomError = require('./error-handler');
const { HTTP_STATUS_CODES } = require('../libs/constants');
const SECRET_KEY = process.env.SECRET_KEY;




const auth = async (req, res, next) => {
    const { authorization = ''} = req.headers;
    const [bearer, token] = authorization.split(' ');
    try { 
        if (bearer !== 'Bearer') {
            throw new CustomError(HTTP_STATUS_CODES.UNAUTHORIZED, 'not authorized');
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            throw new CustomError(HTTP_STATUS_CODES.UNAUTHORIZED, 'not authorized');
        }
        req.user = user;
        console.log(user);
        next();
    } catch (error) {
        if ((error.message = 'invalid signature')) {
            error.status = HTTP_STATUS_CODES.UNAUTHORIZED;
        }
        throw error;
    }
};
 
module.exports = auth;



