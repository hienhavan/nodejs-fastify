class ApiError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.status = statusCode;
        this.details = details;
    }
}

class NotFoundError extends ApiError {
    constructor(message = "Resource Not found") {
        super(message, 404);
    }
}

class ValidationError extends ApiError {
    constructor(message = "Validation failed", details) {
        super(message, 400, details);
    }
}

class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
class DatabaseError extends Error {
    constructor(message = "Database error") {
        super(message, 500);
    }
}

module.exports = {
    ApiError,
    NotFoundError,
    ValidationError,
    UnauthorizedError,
    DatabaseError
}