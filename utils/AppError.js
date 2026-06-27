class AppError extends Error {
    constructor(status, code, message) {
        super(message);
        this.statusCode = status;
        this.code = code;
    }
}

module.exports = AppError;