require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function query(query, params, callback) {
  pool.query(query, params, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
}

module.exports = { query };
