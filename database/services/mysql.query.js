require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  connectTimeout: 100000,
});

pool.getConnection((err, res) => {
  if (err) return console.log(err);
  console.log("success connecting to db");
});

const query = (query, params, callback) => {
  pool.query(query, params, (err, results) => {
    if (err) callback(err, null);
    else callback(null, results);
  });
};

module.exports = { query };
