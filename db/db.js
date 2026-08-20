const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:Number(process.env.dbPort) || 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
    return;
  }

  console.log('conectado ao MySQL!');
})

export default connection;