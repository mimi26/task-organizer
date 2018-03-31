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
        return pgp('postgres://ankouvidkrkner:61de36ce0ede93205f55a639a7c3c9c7bfa40fc3d1676a128e7b7d9e99b9aa0c@ec2-184-72-219-186.compute-1.amazonaws.com:5432/d2gdcm1dna24i6');
    }
}

const db = setDatabase();

module.exports = db;