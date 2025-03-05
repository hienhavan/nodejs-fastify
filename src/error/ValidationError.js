class ValidationError extends Error {
    constructor(message = "Dữ liệu không hợp lệ") {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

module.exports = ValidationError;
