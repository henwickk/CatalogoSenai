
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const caminhoCA = path.join(__dirname, "..", "ca.pem");
const certificadoCA = fs.readFileSync(caminhoCA, "utf8");

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    ssl: {
        ca: certificadoCA,
        rejectUnauthorized: true
    }
});

console.log("Conexão com MySQL configurada!");

module.exports = connection;
