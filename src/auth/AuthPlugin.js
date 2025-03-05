const fp = require('fastify-plugin');

async function authPlugin(fastify, options) {
    // Đăng ký fastify-jwt với secret key
    fastify.register(require('@fastify/jwt'), {
        secret: options.secret || 'supersecret',
    });

    // Middleware kiểm tra token (được gọi trước mỗi request)
    fastify.decorate('authenticate', async function (request, reply) {
        try {
            // Kiểm tra xem route này có phải là public không
            if (options.publicRoutes && options.publicRoutes.includes(request.routerPath)) {
                return; // Bỏ qua xác thực
            }

            // Kiểm tra JWT token
            await request.jwtVerify();
        } catch (err) {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    });

    // Thêm route đăng nhập (trả về token)
    fastify.post('/login', async (request, reply) => {
        const { username, password } = request.body;
        if (username === 'admin' && password === 'password') {
            const token = fastify.jwt.sign({ username });
            return { token };
        }
        reply.code(401).send({ error: 'Invalid credentials' });
    });
}

// Xuất plugin
module.exports = fp(authPlugin);
