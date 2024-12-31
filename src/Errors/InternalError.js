const { INTERNAL_SERVER_ERROR } = require("../constants/StatusCodes");

class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalError";
        this.status = INTERNAL_SERVER_ERROR;
    }
}

module.exports = InternalError;