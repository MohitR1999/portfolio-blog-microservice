const { INVALID_TOKEN } = require("../constants/Error");
const { ACCESS_DENIED } = require("../constants/StatusCodes");

class InvalidTokenError extends Error {
    constructor() {
        super(INVALID_TOKEN);
        this.name = "InvalidTokenError";
        this.status = ACCESS_DENIED;
    }
}

module.exports = InvalidTokenError;