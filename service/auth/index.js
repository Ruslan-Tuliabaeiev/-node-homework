const jwt = require('jsonwebtoken');
const Users = require('../../repository/users');
const { HTTP_STATUS_CODES } = require('../../libs/constants');
const { CustomError } = require('../../middlewares/error-handler');
const SECRET_KEY = process.env.SECRET_KEY;
const EmailService = require('../email/sevice');
const SenderNodemailer = require('../email/senders/nodemailer-sender');


class AuthService { 
   async create(body) {
        const user = await Users.findByEmail( body.email );
        if (user) {
            throw new CustomError(HTTP_STATUS_CODES.CONFLICT, 'User already exist');
       }
       
       const newUser = await Users.create(body);

       const sender = new SenderNodemailer();
       const emailService = new EmailService(sender);
       try {
           await emailService.sendEmail(
               newUser.email,
               newUser.name,
               newUser.verifyEmailToken);
       } catch (error) {
           console.log(error);
         
       }

       return {
           id: newUser.id,
           email: newUser.email,
           subscription: newUser.subscription,
              avatar: newUser.avatar,
        };
    }

    async login({ email, password }) {
        const user = await this.getUser(email, password);
        if (!user) {
            throw new CustomError(
                HTTP_STATUS_CODES.UNAUTHORIZED,
                'invalid credentials'
            )
        }
        const token = this.generateToken(user);
       
        await Users.updateToken(user.id, token);
        return { token }
        
    }

 async logout(id) {
await Users.updateToken(id, null);
    }



async currentUser(token) {
    const user = await Users.findByToken(token);
    console.log(user);
    if (!user) {
        throw new CustomError(HTTP_STATUS_CODES.UNAUTHORIZED, 'invalid token');
    }
    return {
        email: user.email,
        subscription: user.subscription, 
    };
    }
    
    async getUser(email, password) {
        const user = await Users.findByEmail(email);
        if (!user) {
            throw new CustomError(HTTP_STATUS_CODES.NOT_FOUND, 'user not found');
        }
        if (!(await user?.isValidPassword(password))) {
            throw new CustomError(HTTP_STATUS_CODES.UNAUTHORIZED, 'invalid credentials');
        }
        if (!user?.verified) {
           throw new CustomError(HTTP_STATUS_CODES.UNAUTHORIZED, 'user not verified');
        }
        return user;
    }
    
    generateToken(user) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
        return token;
    } 

    async verifyUser(token) { 
        const user = await Users.findByVerifyToken(token);
        if (!user) {
            throw new CustomError(HTTP_STATUS_CODES.BAD_REQUEST, 'invalid token');
        }
        if (user && user.verified) {
            throw new CustomError(HTTP_STATUS_CODES.BAD_REQUEST, 'user already verified');
        }

        await Users.verifyUser(user.id);
        return user;

    }


    async reverifyEmail(email) {
        const user = await Users.findByEmail(email);
        if (!user) {
            throw new CustomError(HTTP_STATUS_CODES.NOT_FOUND, 'user not found');

        }
        if (user && !user.verified) {
            throw new CustomError(HTTP_STATUS_CODES.BAD_REQUEST, 'user already verified');
        }
        const sender = new SenderNodemailer();
        const emailService = new EmailService(sender);
        try {
            await emailService.sendEmail(user.email, user.name, user.verifyEmailToken);
        } catch (error) {
            console.log(error);
            throw new CustomError(HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, 'ERROR_SENDING_EMAIL');
        }

        
    }

}



module.exports = new AuthService();