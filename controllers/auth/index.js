const AuthService = require('../../service/auth');
const { HTTP_STATUS_CODES } = require('../../libs/constants');




const registration = async (req, res) => {
    const user = await AuthService.create(req.body);
    return res.status(HTTP_STATUS_CODES.CREATED).json({
        status: "success",
        code: HTTP_STATUS_CODES.CREATED,
        data: { ...user }
        

    });
};

const login = async (req, res) => {
    const token = await AuthService.login(req.body);
    return res.status(HTTP_STATUS_CODES.OK).json({
        status: "success",
        code: HTTP_STATUS_CODES.OK,
        data: {token }
    });
}

const logout = async (req, res) => {
    await AuthService.logout(req.user.id);
    return res.status(HTTP_STATUS_CODES.NO_CONTENT).json()
   
}

const verifyUser = async (req, res) => {
    const token = req.params.token;
    const user = await AuthService.verifyUser(token);
    return res.status(HTTP_STATUS_CODES.OK).json({
        status: "success",
        code: HTTP_STATUS_CODES.OK,
        data: { massage: `User verified .Welcom ${user.name} ` }
    });
 }
   

const reverifyEmail = async (req, res) => { 
const { email } = req.body;
    await AuthService.reverifyEmail(email);
    return res.status(HTTP_STATUS_CODES.OK).json({
        status: "success",
        code: HTTP_STATUS_CODES.OK,
        data: { massage: `Success` }
    });
}

module.exports = {
    registration,
    login,
    logout,
    reverifyEmail,
    verifyUser
}

