CREATE DATABASE IF NOT EXISTS todolist_api;

USE todolist_api;

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS activities;

CREATE TABLE todos (
  id                  INT(11) NOT NULL AUTO_INCREMENT,
  activity_group_id   INT(11) NOT NULL,
  title               VARCHAR(255) NOT NULL,
  is_active           BOOLEAN NOT NULL,
  priority            VARCHAR(255) NOT NULL DEFAULT 'very-high',
  createdAt           DATETIME DEFAULT CURRENT_TIMESTAMP,
  updateAt            DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE activities (
  id            INT(11) NOT NULL AUTO_INCREMENT,
  title         VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updateAt      DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

DELIMITER $$
  CREATE PROCEDURE TODOS_CREATE_RETURN (
    IN p_title VARCHAR(255),
    IN p_activity_group_id INT(11),
    IN p_is_active BOOLEAN
  )
  BEGIN
    INSERT INTO todos (title, activity_group_id, is_active) VALUES (p_title, p_activity_group_id, p_is_active);
    SELECT * FROM todos WHERE id = LAST_INSERT_ID();
  END$$

  CREATE PROCEDURE TODOS_UPDATE_RETURN (
    IN p_title VARCHAR(255), 
    IN p_priority VARCHAR(255),
    IN p_is_active BOOLEAN,
    IN p_id INT(11)
  )
  BEGIN
    UPDATE todos SET title = p_title, priority = p_priority, is_active = p_is_active WHERE id = p_id;
    SELECT * FROM todos WHERE id = p_id;
  END$$

  CREATE PROCEDURE ACTIVITIES_CREATE_RETURN (IN p_title VARCHAR(255), IN p_email VARCHAR(255))
  BEGIN
    INSERT INTO activities (title, email) VALUES (p_title, p_email);
    SELECT * FROM activities WHERE id = LAST_INSERT_ID();
  END$$

  CREATE PROCEDURE ACTIVITIES_UPDATE_RETURN (IN p_title VARCHAR(255), IN p_id INT(11))
  BEGIN
    UPDATE activities SET title = p_title WHERE id = p_id;
    SELECT * FROM activities WHERE id = p_id;
  END$$
DELIMITER ;