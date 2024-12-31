const getTokenFromHeaders = (request) => {
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    return token;
}

module.exports = {
    getTokenFromHeaders,
}