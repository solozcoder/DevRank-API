const Response = require("./../util/response");
const QUERY = require("./../query/todos.query");
const db = require("./../../database/services/mysql.query");
const logger = require("./../util/logger");
const { SUCCESS_HANDLE, ERROR_HANDLE, NOT_FOUND_HANDLE } = require("./handle");

// Query All todo
const GET_ALL_TODO = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Query All Todos`);

  db.query(QUERY.SELECT_ALL_TODOS, [], (err, Data) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    }

    SUCCESS_HANDLE(req, res, null, Data);
  });
};

// Get one todo
const GET_ONE_TODO = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, Query One Todos`);

  db.query(QUERY.SELECT_TODOS, [id], (err, Data) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    } else if (!Data[0]) {
      var log = `Todo with ID ${id} Not Found`;

      logger.error(`${req.method} ${req.originalUrl}, ${log}`);
      return NOT_FOUND_HANDLE(req, res, `Todo with ID ${id} Not Found`);
    }

    SUCCESS_HANDLE(req, res, null, Data[0]);
  });
};

// Post todo
const POST_TODO = (req, res) => {
  const { title, activity_group_id, is_active } = req.body;

  logger.info(`${req.method} ${req.originalUrl}, Creating Todos`);

  db.query(
    QUERY.CREATE_TODOS_PROCEDURE,
    [title, activity_group_id, is_active],
    (err, Data) => {
      if (err) {
        logger.error(err.message);
        return ERROR_HANDLE(req, res, err);
      }

      SUCCESS_HANDLE(req, res, null, Data[0][0]);
    }
  );
};

// Update todo
const UPDATE_TODO = (req, res) => {
  const { title, priority, is_active, status } = req.body;
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, Updating Todos`);

  db.query(
    QUERY.UPDATE_TODOS_PROCEDURE,
    [title, priority, is_active, id],
    (err, Data) => {
      if (err) {
        logger.error(err.message);
        return ERROR_HANDLE(req, res, err);
      } else if (!Data[0][0]) {
        var log = `Todo with ID ${id} Not Found`;

        logger.error(`${req.method} ${req.originalUrl}, ${log}`);
        return NOT_FOUND_HANDLE(req, res, `${log}`);
      }

      SUCCESS_HANDLE(req, res, null, Data[0]);
    }
  );
};

// Delete todo
const DELETE_TODO = (req, res) => {
  const { id } = req.params;

  logger.info(`${req.method} ${req.originalUrl}, Deleting Todos`);

  db.query(QUERY.DELETE_TODOS, [id], (err, delete_result) => {
    if (err) {
      logger.error(err.message);
      return ERROR_HANDLE(req, res, err);
    } else if (delete_result.affectedRows === 0) {
      var log = `Todo with ID ${id} Not Found`;

      logger.error(`${req.method} ${req.originalUrl}, ${log}`);
      return NOT_FOUND_HANDLE(req, res, `${log}`);
    }

    SUCCESS_HANDLE(req, res, `Success delete ID ${id}`);
  });
};

module.exports = {
  GET_ALL_TODO,
  GET_ONE_TODO,
  POST_TODO,
  UPDATE_TODO,
  DELETE_TODO,
};
