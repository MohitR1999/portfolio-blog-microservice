const { MISSING_TOKEN } = require("../constants/Error");
const { UNAUTHORIZED } = require("../constants/StatusCodes");

class MissingTokenError extends Error {
    constructor() {
        super(MISSING_TOKEN);
        this.name = "MissingTokenError";
        this.status = UNAUTHORIZED
    }
}

module.exports = MissingTokenError;