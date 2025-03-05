
const ApiResponse = require("../utils/ApiResponse");

const fastify = require("fastify")({ logger: true });

const homeSchema = require("../schemas/homeSchema");
const { body } = require("../schemas/homeSchema");
const { NotFoundError, UnauthorizedError, ValidationError } = require("../error/ApiError");

fastify.register(require('../auth/AuthPlugin'), {
    secret: 'my-secret-key', // Khóa JWT
    publicRoutes: ['/login', '/public'], // Các route không cần xác thực
});

// Route không cần xác thực
fastify.get('/public', async () => {
    return { message: 'This is a public route' };
});

// Route cần xác thực
fastify.get('/protected', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    return { message: `Hello, ${request.user.username}! This is a protected route.` };
});




//Trước khi Fastify xử lý request(Kiểm tra auth, logging, rate limit)
fastify.addHook('onRequest', async (request, reply) => {
    request.log.info(`Incoming request: ${request.method} ${request.url}`);
});

//Trước khi gọi route handler(Valroleate data, caching)
fastify.addHook('preHandler', async (request, reply) => {
    if (request.headers['x-api-key'] !== 'secret') {
        reply.code(401).send({ error: 'Unauthorized' });
    }
});

//   Trước khi gửi response(Thay đổi response data, thêm header)
fastify.addHook('onSend', async (request, reply, payload) => {
    reply.header('X-Powered-By', 'Fastify');
    return payload;
});

//   Khi có lỗi(Xử lý lỗi, logging lỗi)
fastify.get('/error', async (request, reply) => {
    throw new Error('Có lỗi xảy ra!');
});

fastify.get("/home", async (request, reply) => {
    const message = "Hello, World!"
    return reply.send(ApiResponse.success(message))
});

// fastify.post("/home", { schema: homeSchema }, async (request, reply) => {
//     const { name, password } = request.body;
//     return { message: name + ":" + password };
// });

module.exports = async function (fastify, opts) {
    fastify.post("/home", {
        schema: {
            body: fastify.getSchema("homeSchema") // Gọi schema đã đăng ký
        }
    }, async (request, reply) => {
        const { name, password } = request.body;
        return { message: `${name}:${password}` };
    });
};

fastify.get("/home/:role", async (request, reply) => {
    try {
        const role = request.params.role;
        if (!role.match(/^[a-z0-9]+$/)) {
            throw new UnauthorizedError("role người dùng không hợp lệ");
        }

        const user = await User.findByrole(role);
        if (!user) {
            throw new NotFoundError()
        }
        return { role: getRole(role) }
    } catch (err) {
        reply.status(err.statusCode || 500).send({ error: err.message });
    }
});


fastify.put("/home/:role", async (request, reply) => {
    const { role } = request.params;
    getRole(role) != "khong co quyen" && setRole(role)
    return { role: getRole(role) }
});

const roles = {
    admin: "admin",
    user: "user",
};


const getRole = (role) => roles?.[role] ?? "khong co quyen";
const setRole = (role) => {
    role === "admin" && (roles[role] = "a");
    role === "user" && (roles[role] = "b")
};
