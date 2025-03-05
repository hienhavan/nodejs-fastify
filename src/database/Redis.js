'use strict'

const fastify = require('fastify')()

// Đăng ký plugin Redis
fastify.register(require('@fastify/redis'), { host: '127.0.0.1' })
// Hoặc dùng URL: fastify.register(require('@fastify/redis'), { url: 'redis://127.0.0.1' })

fastify.get('/user-details', async (req, reply) => {
    try {
        const key = req.query.key;
        const value = await fastify.redis.get(key)
        return reply.send({ value })
    } catch (error) {
        throw new Error()
    }
})

fastify.post('/user', async (req, reply) => {
    try {
        const key = req.body.key;
        const value = req.body.value;
        await fastify.redis.set(key, value)
        return reply.send({ status: 'ok', key: key, value: value })
    } catch (error) {
        throw new Error()
    }
})


