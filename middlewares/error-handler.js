const { HTTP_STATUS_CODES } = require('../libs/constants');





class CustomError extends Error {
    constructor(statusCode, message, name = 'AppError') {
        super(message);
        this.statusCode = statusCode;
        this.name = name;

        Error.captureStackTrace(this, this.constructor);

    }
}

const wrapper = (fn) => async (req, res, next) => {
    try {
        const result = await fn(req, res, next);
        return result
    } catch (error) {
        switch (error.name) {
            case 'validationError':
                res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                    status: 'error',
                    message: error.message,
                    code: HTTP_STATUS_CODES.BAD_REQUEST,
                     

                });
                break;
            case 'AppError':
                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                    code: error.statusCode,
                });
                break;
            default:
                next(error);
                break;
        }

    }
                  
}


module.exports = { wrapper, CustomError };