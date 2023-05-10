const Response = require("./../util/response");
const QUERY = require("./../query/activities.query");
const db = require("../../database/services/mysql.query");
const { SUCCESS_HANDLE, ERROR_HANDLE, NOT_FOUND_HANDLE } = require("./handle");


// Query All activities
const GET_ALL_ACTIVITIES = (req, res) => {
  db.query(QUERY.SELECT_ALL_ACTIVITIES, [], (err, Data) => {
    if (err) return ERROR_HANDLE(req, res, err);

    SUCCESS_HANDLE(req, res, null, Data);
  });
};

// Get one activities 
const GET_ONE_ACTIVITIES = (req, res) => {
  const { id } = req.params;

  db.query(QUERY.SELECT_ACTIVITIES, [id], (err, Data) => {
    if (err) return ERROR_HANDLE(req, res, err);
    else if (!Data[0]) return NOT_FOUND_HANDLE(req, res, `Activities with ID ${id} Not Found`);

    SUCCESS_HANDLE(req, res, null, Data[0]);
  });
};

// Post activities
const POST_ACTIVITIES = (req, res) => {
  const { title, email } = req.body;

  db.query(QUERY.CREATE_ACTIVITIES, [title, email], (err, insertResult) => {
      if (err) return ERROR_HANDLE(req, res, err);

      db.query(QUERY.SELECT_ACTIVITIES, [insertResult.insertId], (err, Data) => {
        if (err) return ERROR_HANDLE(req, res, err);
        else if(!Data[0]) return NOT_FOUND_HANDLE(req, res, `Activities with ID ${insertResult.insertId} Not Found`);

        SUCCESS_HANDLE(req, res, null, Data[0]);
      });
    }
  );
}

// Update activities
const UPDATE_ACTIVITIES = (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  db.query(QUERY.UPDATE_ACTIVITIES, [title, id], (err, query_update) => {
      if (err) return ERROR_HANDLE(req, res, err);

      db.query(QUERY.SELECT_ACTIVITIES, [id], (err, Data) => {
        if (err) return ERROR_HANDLE(req, res, err);
        else if(!Data[0]) return NOT_FOUND_HANDLE(req, res, `Activitiesa with ID ${id} Not Found`);

        SUCCESS_HANDLE(req, res, null, Data[0]);
      });
    }
  );
};

// Delete activities
const DELETE_ACTIVITIES = (req, res) => {
  const { id } = req.params;

  db.query(QUERY.DELETE_ACTIVITIES, [id], (err, delete_result) => {
    if (err) return ERROR_HANDLE(req, res, err);
    else if (delete_result.affectedRows === 0) return NOT_FOUND_HANDLE(req, res, `Activity with ID ${id} Not Found`);

    SUCCESS_HANDLE(req, res, `Success delete activity ID ${id}`);
  });
}

module.exports = { GET_ALL_ACTIVITIES, GET_ONE_ACTIVITIES, POST_ACTIVITIES, UPDATE_ACTIVITIES, DELETE_ACTIVITIES };