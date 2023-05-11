const QUERY = {
  SELECT_ALL_ACTIVITIES: "SELECT * FROM activities",
  SELECT_ACTIVITIES: "SELECT * FROM activities WHERE id = ?",
  CREATE_ACTIVITIES: "INSERT INTO activities (title, email) VALUES (?, ?)",
  UPDATE_ACTIVITIES: "UPDATE activities SET title = ? WHERE id = ?",
  DELETE_ACTIVITIES: "DELETE FROM activities WHERE id = ?",
  CREATE_ACTIVITIES_PROCEDURE: "CALL ACTIVITIES_CREATE_RETURN(?, ?)",
  UPDATE_ACTIVITIES_PROCEDURE: "CALL ACTIVITIES_UPDATE_RETURN(?, ?)"
}

module.exports = QUERY;