// Sets to connect to online db or local depending on where server is being run
let databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/rxminder';
if (process.env.NODE_ENV === 'production') {
    databaseUrl += '?ssl=true';
}

const knex = require('knex')({
    client: 'pg',
    connection: databaseUrl
});

module.exports = knex;