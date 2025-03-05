const fp = require("fastify-plugin");
const fs = require("fs");
const path = require("path");

async function schemaLoader(fastify) {
    const schemaPath = path.join(__dirname, "../schemas"); // Đường dẫn tới thư mục schema

    fs.readdirSync(schemaPath).forEach((file) => {
        const schema = require(path.join(schemaPath, file)); // Load schema từ file
        fastify.addSchema(schema); // Đăng ký schema vào Fastify
    });
}

module.exports = fp(schemaLoader);
