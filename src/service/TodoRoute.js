const express = require("express");
const todoRoute = express.Router();

const {
  GET_ALL_TODO,
  GET_ONE_TODO,
  POST_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} = require("./../controller/todos.controller");

// var queryAll =
// "SELECT title, activity_group_id, CASE WHEN is_active = 1 THEN true ELSE false END AS is_active, createdAt, updatedAt FROM todoss";

todoRoute.route("/").get(GET_ALL_TODO).post(POST_TODO);

todoRoute
  .route("/:id")
  .get(GET_ONE_TODO)
  .patch(UPDATE_TODO)
  .delete(DELETE_TODO);

module.exports = todoRoute;
