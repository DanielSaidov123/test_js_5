import mysql from "mysql2/promise";

export async function initDb() {
  const initConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
  });

  const CREATE_DB_QUERY = `CREATE DATABASE IF NOT EXISTS test2;`;

  const USE_DB_QUERY = "USE test2;";

  const CREATE_TABLE_QUERY = `
   CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  cipher_type VARCHAR(255) NOT NULL,
  encrypted_text VARCHAR(255) NOT NULL,
  inserted_at INT
);
    `;

  await initConnection.query(CREATE_DB_QUERY);
  await initConnection.query(USE_DB_QUERY);
  await initConnection.query(CREATE_TABLE_QUERY);
  console.log("Database of mysql initialized ");
  
  await initConnection.end();
}
let conn = null;

export async function getConn() {
  if (conn) return conn;
  else {
    const dbConnection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: 3306,
      database: "test2",
    });
    return dbConnection;
  }
}
