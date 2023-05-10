require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ip = require("ip");
const bodyParser = require("body-parser");
const db = require('./../database/services/mysql.query');

let port = process.env.SERVER_PORT || 3030;
const app = express();

// Router
const todoRouter = require("./service/TodoRoute");
// const activityRouter = require("./service/ActivityRoute");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json("API is running");
});

app.use("/todo-items", todoRouter);
// app.use("/activity-groups", activityRouter);

app.listen(port, (err) => {
  if (err) return console.log("[-] Server Error: " + err);
  console.log(`[+] Server is running on: ${ip.address()}:${port}`);
});