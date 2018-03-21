const db = require('../db/config');

const Task = {};

Task.findAll = () => {
    return db.query('SELECT * FROM tasks ORDER BY id ASC');
};

Task.findById = id => {
    return db.oneOrNone(
        `SELECT * FROM tasks
        WHERE id = $1`,
        [id]
    );
};

Task.create = task => {
    return db.one(
        `
        INSERT INTO tasks
        (title, task, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [task.title, task.task, task.user_id]
    );
};

module.exports = Task;

