require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
});

function query(query, params, callback) {
  pool.query(query, params, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
}

module.exports = { query };
