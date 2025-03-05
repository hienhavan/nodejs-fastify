const tap = require('tap');
const sinon = require("sinon");
const userService = require("../userService");

tap.test("Mock userService.getUserById", async (t) => {
    const mock = sinon.stub(userService, "getUserById").resolves({ id: 1, name: "John" });

    const result = await userService.getUserById(1);
    t.same(result, { id: 1, name: "John" });

    mock.restore(); // Khôi phục function gốc
    t.end();
});

const buildFastify = require('./server');

tap.test('GET /Hello, World!', async (t) => {
    const fastify = buildFastify;
    const response = await fastify.inject({
        method: 'GET',
        url: '/home'
    });

    t.equal(response.statusCode, 200, 'Status code should be 200');
    t.same(JSON.parse(response.body), { message: 'Hello, World!' }, 'Response should be pong');
});
