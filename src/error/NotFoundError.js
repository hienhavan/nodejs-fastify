class NotFoundError extends Error {
    constructor(message = "Không tìm thấy tài nguyên") {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;
