const options = {
    receive: (data, result, e) => {
        console.log(e.query);
    },
    query: (e) => {
        console.log(e.query);
    }
};

const pgp = require('pg-promise')(options);

function setDatabase() {
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        return pgp({
            database: 'task_organizer_db',
            port: 5432,
            host: 'localhost'
        });
    } else if (process.env.NODE_ENV === 'production') {
        return pgp(process.env.DATABASE_URL);
    }
}

const db = setDatabase();

module.exports = db;