const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,

} 
const Role = {
    STARTER: 'starter',
    PRO: 'pro',
    BUSINESS: 'business',
}


module.exports = { HTTP_STATUS_CODES, Role };
