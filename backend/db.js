const { Client } = require("pg");

const client = new Client({
    user: "yevmnat",
    host: "localhost",
    database: "student_profiles",
    password: "1234",
    port: 5432,
});

client.connect();

module.exports = client;