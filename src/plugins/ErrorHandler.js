const { ApiError } = require('../error/ApiError');

async function errorHandler(app) {
    app.setErrorHandler((error, request, reply) => {
        if (error instanceof ApiError) {
            return reply.status(error.statusCode).send({
                success: false,
                message: error.message,
                details: error.details
            });
        }
        return reply.status(502).send({
            success: false,
            message: 'Internal Server Error',
        });
    });
}

module.exports = errorHandler;
