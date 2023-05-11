const QUERY = {
  SELECT_ALL_TODOS: "SELECT * FROM todos",
  SELECT_TODOS: "SELECT * FROM todos WHERE id = ?",
  CREATE_TODOS: "INSERT INTO todos (title, activity_group_id, is_active) VALUES (?, ?, ?)",
  UPDATE_TODOS: "UPDATE todos SET title = ?,  priority = ?, is_active = ? WHERE id = ?",
  DELETE_TODOS: "DELETE FROM todos WHERE id = ?",
  CREATE_TODOS_PROCEDURE: "CALL TODOS_CREATE_RETURN(?, ?, ?)",
  UPDATE_TODOS_PROCEDURE: "CALL TODOS_UPDATE_RETURN(?, ?, ?, ?)"
};

module.exports = QUERY;
