const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "mydb",
});

connection.connect(() => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.send("Hello docker");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
