const Response = require("./../util/response");
const QUERY = require("./../query/todos.query");
const db = require("../../database/services/mysql.query");
const { SUCCESS_HANDLE, ERROR_HANDLE, NOT_FOUND_HANDLE } = require("./handle");


// Query All todo
const GET_ALL_TODO = (req, res) => {
  db.query(QUERY.SELECT_ALL_TODOS, [], (err, Data) => {
    if (err) return ERROR_HANDLE(req, res, err);

    SUCCESS_HANDLE(req, res, null, Data);
  });
};

// Get one todo 
const GET_ONE_TODO = (req, res) => {
  const { id } = req.params;

  db.query(QUERY.SELECT_TODOS, [id], (err, Data) => {
    if (err) return ERROR_HANDLE(req, res, err);
    else if (!Data[0]) return NOT_FOUND_HANDLE(req, res, `Todo with ID ${id} Not Found`);

    SUCCESS_HANDLE(req, res, null, Data);
  });
};

// Post todo 
const POST_TODO = (req, res) => {
  const { title, activity_group_id, is_active } = req.body;

  db.query(QUERY.CREATE_TODOS, [title, activity_group_id, is_active], (err, insertResult) => {
      if (err) return ERROR_HANDLE(req, res, err);

      db.query(QUERY.SELECT_TODOS, [insertResult.insertId], (err, Data) => {
        if (err) return ERROR_HANDLE(req, res, err);
        else if(!Data[0]) return NOT_FOUND_HANDLE(req, res, `Todo with ID ${insertResult.insertId} Not Found`);

        SUCCESS_HANDLE(req, res, null, Data[0]);
      });
    }
  );
};

// Update todo
const UPDATE_TODO = (req, res) => {
  const { title, priority, is_active, status } = req.body;
  const { id } = req.params;

  db.query(QUERY.UPDATE_TODOS, [title, priority, is_active, id], (err, query_update) => {
      if (err) return ERROR_HANDLE(req, res, err);

      db.query(QUERY.SELECT_TODOS, [id], (err, Data) => {
        if (err) return ERROR_HANDLE(req, res, err);
        else if(!Data[0]) return NOT_FOUND_HANDLE(req, res, `Todo with ID ${id} Not Found`);

        SUCCESS_HANDLE(req, res, null, Data[0]);
      });
    }
  );
};

// Delete todo
const DELETE_TODO = (req, res) => {
  const { id } = req.params;

  db.query(QUERY.DELETE_TODOS, [id], (err, delete_result) => {
    if (err) return ERROR_HANDLE(req, res, err);
    else if (delete_result.affectedRows === 0) return NOT_FOUND_HANDLE(req, res, `Todo with ID ${id} Not Found`);

    SUCCESS_HANDLE(req, res, `Success delete ID ${id}`);
  });
}

module.exports = { GET_ALL_TODO, GET_ONE_TODO, POST_TODO, UPDATE_TODO, DELETE_TODO };
