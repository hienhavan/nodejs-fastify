const { NotFoundError, DatabaseError } = require('../error/ApiError');

const fastify = require('fastify')();

fastify.register(require('@fastify/mysql'), {
    connectionString: 'mysql://root@localhost/mysql'
});

fastify.get("/user-details", async (_, reply) => {
    const query = "SELECT * FROM users";

    try {
        const [rows] = await fastify.mysql.query(query); // Chờ kết quả từ MySQL
        const usersDTO = rows.map(user => ({
            name: user.name,
            age: user.age,
            mail: user.mail
        }))
        return reply.send(usersDTO); //Trả về dữ liệu JSON
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
});


fastify.get("/user-details/:id", async (_, reply) => {
    const query = "SELECT name,age,mail FROM users WHERE id = ?";
    const id = parseInt(_, params.id);
    try {
        const [rows] = await fastify.mysql.query(query, id);
        return reply.send(userDTO);
    } catch (error) {
        throw new DatabaseError();
    }
});

fastify.get("/user-details/:id", async (req, reply) => {
    const query = "SELECT name, age, mail FROM users WHERE id = ?";
    const id = parseInt(req.params.id);

    try {
        const rows = await fastify.mysql.query(query, [id]);

        if (!rows.length) {
            throw new NotFoundError();
        }

        return reply.send(rows);
    } catch (error) {
        throw new DatabaseError();
    }
});


fastify.delete("/user/:id", async (req, reply) => {
    const query = "DELETE FROM users WHERE id = ?";
    const id = parseInt(req.params.id);

    fastify.mysql.query(query, [id], (err, result) => {
        if (err) {
            throw new DatabaseError();
        }

        if (result.affectedRows === 0) {
            throw new NotFoundError();
        }

        return reply.send({ message: "Xóa thành công", affectedRows: result.affectedRows });
    });
});
