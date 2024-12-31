const { NOT_FOUND } = require("../constants/StatusCodes");

class NotFoundError extends Error {
    constructor(message) {
        super(`${message} not found`);
        this.name = "NotFoundError";
        this.status = NOT_FOUND;
    }
}

module.exports = NotFoundError;