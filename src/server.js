const fastify = require("fastify")({ logger: true });

fastify.register(require("./plugins/schemaLoader")); // Load tất cả schema

fastify.register(require("./plugins/ErrorHandler")); // load tất cả các error
const start = async () => {
    try {
        await fastify.listen({ port: 8080 });
        console.log("run server 8080");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
