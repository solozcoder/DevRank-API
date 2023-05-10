const express = require("express");
const activityRoute = express.Router();
const {
  GET_ALL_ACTIVITIES,
  GET_ONE_ACTIVITIES,
  POST_ACTIVITIES,
  UPDATE_ACTIVITIES,
  DELETE_ACTIVITIES
} = require("./../controller/activities.controller");


activityRoute.route("/")
  .get(GET_ALL_ACTIVITIES)
  .post(POST_ACTIVITIES);

activityRoute.route("/:id")
  .get(GET_ONE_ACTIVITIES)
  .patch(UPDATE_ACTIVITIES)
  .delete(DELETE_ACTIVITIES)

  
module.exports = activityRoute;
