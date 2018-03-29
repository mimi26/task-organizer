const db = require('../db/config');

const Task = {};

Task.findAll = userId => {
    return db.query(
        `SELECT * FROM tasks 
        WHERE user_id = $1 
        ORDER BY id ASC`,
        [userId]
    );
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

Task.destroy = id => {
    return db.none(
        `
        DELETE FROM tasks
        WHERE id = $1
        `,
        [id]
    );
};

Task.update = (task, id) => {
    return db.none(
        `
        UPDATE tasks SET
        title = $1,
        task = $2,
        user_id = $3
        WHERE id = $4
        `,
        [task.title, task.task, task.user_id, id]
    );
};

module.exports = Task;

