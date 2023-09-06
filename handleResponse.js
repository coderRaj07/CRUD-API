const {get, set} = require('lodash');
const {CustomError} = require('./errors');
const {httpStatusCodes} = require('./http-status-codes');

/**
 * Function for getting default response object
 * @return {Response}
 */
function getDefaultResponseObject() {
    return {
        status: {
            code: '',
            debugMessage: '',
            displayMessage: '',
            error: null
        },
        data: null
    };
};

/**
 * Function for sending valid success response
 * @param {Request} req
 * @param {Response} res
 * @param {any} data
 */
function sendSuccessResponse(req, res, data) {
    const message = getDefaultResponseObject();

    if (get(data, 'code', null) == null) {
        set(message, 'status.code', httpStatusCodes.OK);
    } else {
        set(message, 'status.code', data.code);
    }

    if (get(data, 'displayMessage', null) == null) {
        set(message, 'status.displayMessage', 'success');
    } else {
        set(message, 'status.displayMessage', data.displayMessage);
    }

    if (get(data, 'debugMessage', null) == null) {
        set(message, 'status.debugMessage', 'success');
    } else {
        set(message, 'status.debugMessage', data.debugMessage);
    }

    if (get(data, 'code', null) == null) {
        message.data = data;
    }
    res.locals.error = new CustomError(404, 'User not found');
    sendResponse(req, res, message);
}

/**
 * Function for handing errors in API
 * @param {Request} req
 * @param {Response} res
 * @param {Error|CustomError|InvalidRequestError|InvalidPermissionsError} error
 */
function sendErrorResponse(req, res, error) {
    const message = getDefaultResponseObject();

    if (error instanceof CustomError) {
        set(message, 'status.code', error.statusCode);
        set(message, 'status.debugMessage', error.message);
        set(message, 'status.displayMessage', error.message);
        set(message, 'status.error', error.stack);
    } else if (error instanceof Error) {
        set(message, 'status.code', httpStatusCodes.BAD_REQUEST);
        set(message, 'status.debugMessage', error.message);
        set(message, 'status.displayMessage', 'Oops! Something went wrong! Please try again later');
        set(message, 'status.error', error.stack);
    }

    res.locals.error = error

    message.data = null;

    sendResponse(req, res, message);
}

/**
 * Function for sending response handle both result and error cases
 * @param {Request} req
 * @param {Response} res
 * @param {Object} responseObject
 */
function sendResponse(req, res, responseObject) {
    res.statusCode = get(responseObject, 'status.code', httpStatusCodes.OK);
    res.json(responseObject);
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
};
