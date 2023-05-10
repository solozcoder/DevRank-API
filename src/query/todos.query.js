const QUERY = {
  SELECT_ALL_TODOS: "SELECT * FROM todos",
  SELECT_TODOS: "SELECT * FROM todos WHERE id = ?",
  CREATE_TODOS:
    "INSERT INTO todos (title, activity_group_id, is_active) VALUES (?, ?, ?)",
  UPDATE_TODOS:
    "UPDATE todos SET title = ?,  priority = ?, is_active = ? WHERE id = ?",
};

module.exports = QUERY;
