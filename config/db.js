const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testapi"
});

con.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected!");
});

// con.query("CREATE DATABASE testapi", (err, result) => {
//   if (err) throw err;
//   console.log("Database created");
// });

// let sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
// con.query(sql, (err, result) => {
//   if (err) throw err;
//   console.log("Table created");
// });

module.exports = con;
