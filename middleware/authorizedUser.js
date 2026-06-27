const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const AppError = require("../utils/AppError");

const authorizedUser = (req, res, next) => {
    let authToken = req.headers.authorization ?? '';
    authToken = authToken.split(' ')[1] ?? '';
    authToken = authToken.trim();

    if (authToken == "") {
        return next(new AppError(401, "INVALID_TOKEN", "Bearer token missing."));
    }

    jwt.verify(authToken, process.env.JWT_SECRET, (err, response) => {
        if (err) {
            return next(new AppError(401, "INVALID_TOKEN", "Bearer token invalid or expired. " + err));
        }
        if (response.role != 'admin') {
            return next(new AppError(403, "FORBIDDEN", "Note permission for create product."));
        }
        req.userData = response;
        next();
    })
}

module.exports = authorizedUser;