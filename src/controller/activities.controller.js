const Response = require("./../util/response");
const QUERY = require("./../query/activities.query");
const db = require("../../database/services/mysql.query");
const logger = require("./../util/logger");
const { SUCCESS_HANDLE, ERROR_HANDLE, NOT_FOUND_HANDLE } = require("./handle");

// Query All activities
const GET_ALL_ACTIVITIES = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Query All Activity`);

  db.query(QUERY.SELECT_ALL_ACTIVITIES, [], (err, Data) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    }

    SUCCESS_HANDLE(req, res, null, Data);
  });
};

// Get one activities
const GET_ONE_ACTIVITIES = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, Query One Todos`);

  db.query(QUERY.SELECT_ACTIVITIES, [id], (err, Data) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    } else if (!Data[0]) {
      var log = `Activities with ID ${id} Not Found`;

      logger.error(`${req.method} ${req.originalUrl}, ${log}`);
      return NOT_FOUND_HANDLE(req, res, `${log}`);
    }

    SUCCESS_HANDLE(req, res, null, Data[0]);
  });
};

// Post activities
const POST_ACTIVITIES = (req, res) => {
  const { title, email } = req.body;

  logger.info(`${req.method} ${req.originalUrl}, Creating Activity`);

  db.query(QUERY.CREATE_ACTIVITIES_PROCEDURE, [title, email], (err, Data) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    }

    SUCCESS_HANDLE(req, res, null, Data[0][0]);
  });
};

// Update activities
const UPDATE_ACTIVITIES = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, Updating Activity`);

  db.query(QUERY.UPDATE_ACTIVITIES_PROCEDURE, [title, id], (err, Data) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    } else if (!Data[0][0]) {
      var log = `Activities with ID ${id} Not Found`;

      logger.error(`${req.method} ${req.originalUrl}, ${log}`);
      return NOT_FOUND_HANDLE(req, res, `${log}`);
    }

    SUCCESS_HANDLE(req, res, null, Data[0][0]);
  });
};

// Delete activities
const DELETE_ACTIVITIES = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, Deleting Todos`);

  db.query(QUERY.DELETE_ACTIVITIES, [id], (err, delete_result) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    } else if (delete_result.affectedRows === 0) {
      var log = `Activity with ID ${id} Not Found`;

      logger.error(`${req.method} ${req.originalUrl}, ${log}`);
      return NOT_FOUND_HANDLE(req, res, `${log}`);
    }

    SUCCESS_HANDLE(req, res, `Success delete activity ID ${id}`);
  });
};

module.exports = {
  GET_ALL_ACTIVITIES,
  GET_ONE_ACTIVITIES,
  POST_ACTIVITIES,
  UPDATE_ACTIVITIES,
  DELETE_ACTIVITIES,
};
