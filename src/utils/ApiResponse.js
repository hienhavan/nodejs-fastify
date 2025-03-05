class ApiResponse {
  constructor(statusCode, message, data = null, error = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success(data, message = "Success") {
    return new ApiResponse(200, message, data);
  }

  static error(message, statusCode = 400) {
    return new ApiResponse(statusCode, message, null, message);
  }
}

module.exports = ApiResponse;

