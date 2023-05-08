require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ip = require("ip");
const bodyParser = require("body-parser");
const db = require("./database/query");

let port = process.env.SERVER_PORT || 3030;
const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json("API is running");
});

// var queryAll =
// "SELECT title, activity_group_id, CASE WHEN is_active = 1 THEN true ELSE false END AS is_active, createdAt, updatedAt FROM todos";

// Query all todo list
app.get("/todo-items", async (req, res) => {
  var getAllResult = await db.query("SELECT * FROM todos");

  return res.json({
    status: "Success",
    message: "Success",
    data: getAllResult,
  });
});

// Get one
app.get("/todo-items/:id", async (req, res) => {
  const { id } = req.params;

  var getResult = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
  if (getResult.length === 0)
    return res.json({
      status: "Not Found",
      message: `Todo with ID ${id} Not Found`,
    });

  return res.json(getResult[0]);
});

// Create todo list
app.post("/todo-items", async (req, res) => {
  const { title, activity_group_id, is_active } = req.body;

  var insertResult = await db.query(
    "INSERT INTO todos (title, activity_group_id, is_active) VALUES (?, ?, ?)",
    [title, activity_group_id, is_active]
  );

  var getResult = await db.query("SELECT * FROM todos WHERE id = ?", [
    insertResult.insertId,
  ]);

  return res.json({
    status: "Success",
    message: "Success",
    data: getResult[0],
  });
});

app.patch("/todo-items/:id", async (req, res) => {
  const { title, priority, is_active, status } = req.body;
  const { id } = req.params;

  const getQuery = await db.query(
    `UPDATE todos SET title = ?,  priority = ?, is_active = ? WHERE id = ?`,
    [title, priority, is_active, id]
  );

  var getResult = await db.query("SELECT * FROM todos WHERE id = ?", [id]);

  return res.json({
    status: "Success",
    message: "Success",
    data: getResult[0],
  });
});

app.delete("/todo-items/:id", async (req, res) => {
  const { id } = req.params;

  const query = await db.query("DELETE FROM todos WHERE id = ?", [id]);

  if (query.affectedRows === 0)
    return res.json({
      status: "Not Found",
      message: `Todo with ID ${id} Not Found`,
    });

  return res.json({
    status: "Success",
    message: `Success delete ID ${id}`,
  });
});

app.listen(port, (err) => {
  if (err) return console.log("[-] Server Error: " + err);
  console.log("[+] Server is running in port: " + port);
});
