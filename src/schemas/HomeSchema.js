const homeSchema = {
    $id: "homeSchema",
    // querystring: { // querystring dùng để lấy dữ liệu từ url
    body: {    // body dùng để lấy dữ liệu từ body
        type: "object",
        properties: {
            name: { type: "string", minLength: 10 },
            password: { type: "string", minLength: 10 }
        },
        required: ["name", "password"]
    }
};

module.exports = homeSchema;
