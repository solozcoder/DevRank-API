CREATE DATABASE IF NOT EXISTS todolist_api;

USE todolist_api;

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS activities;

CREATE TABLE todos (
  id                  INT(11) NOT NULL AUTO_INCREMENT,
  activity_group_id   INT(11) NOT NULL,
  title               TEXT NOT NULL,
  is_active           BOOLEAN NOT NULL,
  priority            TEXT NOT NULL DEFAULT "very-high",
  createdAt           DATETIME DEFAULT CURRENT_TIMESTAMP,
  updateAt            DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE activities (
  id            INT(11) NOT NULL AUTO_INCREMENT,
  title         TEXT NOT NULL,
  email         TEXT NOT NULL,
  createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP,
  updateAt      DATETIME ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);