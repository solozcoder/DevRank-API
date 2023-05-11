require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ip = require("ip");
const bodyParser = require("body-parser");
const logger = require("./util/logger");
const morgan = require("morgan");
// const { migration } = require("./../database/services/mysql.query");

var port = process.env.PORT || 3030;
const app = express();

// Router
const todoRouter = require("./service/TodoRoute");
const activityRouter = require("./service/ActivityRoute");

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json("API is running");
});

app.use("/todo-items", todoRouter);
app.use("/activity-groups", activityRouter);

const run = async () => {
  try {
    // await migration();
    app.listen(port);

    logger.info(`[+] Server is running on: ${ip.address()}:${port}`);
  } catch (err) {
    logger.error(err.message);
  }
};

run();
