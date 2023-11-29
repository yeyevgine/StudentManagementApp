const { Client } = require("pg");

const client = new Client({
    user: "your_username",
    host: "your_host",
    database: "your_database_name",
    password: "your_password",
    port: 5432, // Your PostgreSQL port number
});

client.connect();

module.exports = client;
