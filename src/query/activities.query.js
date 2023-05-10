const QUERY = {
  SELECT_ALL_ACTIVITIES: "SELECT * FROM activities",
  SELECT_ACTIVITIES: "SELECT * FROM activities WHERE id = ?",
  CREATE_ACTIVITIES: "INSERT INTO activities (title, email) VALUES (?, ?)",
  UPDATE_ACTIVITIES: "UPDATE activities SET title = ? WHERE id = ?",
  DELETE_ACTIVITIES: "DELETE FROM activities WHERE id = ?"
}

module.exports = QUERY;