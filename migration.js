const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const config = require("./lib/config/fastify/index");

const pool = mysql.createPool({
  connectionLimit: 1,
  host: config.env.DATABASE_HOST,
  port: config.env.DATABASE_PORT,
  user: config.env.DATABASE_USER,
  password: config.env.DATABASE_PASSWORD,
  database: config.env.DATABASE_NAME,
  multipleStatements: true,
});

pool.getConnection(function (error, connection) {
  if (error) throw error;
  const users = fs.readFileSync(path.join(__dirname, "./migrations/migration.sql")).toString();

  // Do something with the connection
  connection.query(users, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("Query run successfully");

      // Don't forget to release the connection when finished!
      pool.releaseConnection(connection);
      exit();
    }
  });
});
