const { BAD_REQUEST } = require("../constants/StatusCodes");

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.status = BAD_REQUEST;
    }
}

module.exports = ValidationError;