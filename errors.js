const {httpStatusCodes} = require('./http-status-codes');

class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

class InvalidRequestError extends CustomError {
    constructor(message) {
        super(httpStatusCodes.BAD_REQUEST, message);
    }
}

class InvalidPermissionsError extends CustomError {
    constructor(message) {
        super(httpStatusCodes.FORBIDDEN, message);
    }
}

module.exports = {
    CustomError,
    InvalidRequestError,
    InvalidPermissionsError
};
