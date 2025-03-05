class DatabaseError extends Error {
    constructor(message = "Lỗi cơ sở dữ liệu") {
        super(message);
        this.name = "DatabaseError";
        this.statusCode = 500;
    }
}

module.exports = DatabaseError;
