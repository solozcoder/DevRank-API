const express = require("express");
const router = express.Router();
const db = require("../database/services/query");

// Query all activity list
router.get("/", async (req, res) => {
  var getAllResult = await db.query("SELECT * FROM activities");

  return res.json({
    status: "Success",
    message: "Success",
    data: getAllResult,
  });
});

// Get one
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  var getResult = await db.query("SELECT * FROM activities WHERE id = ?", [id]);
  if (getResult.length === 0)
    return res.json({
      status: "Not Found",
      message: `Activities with ID ${id} Not Found`,
    });

  return res.json(getResult[0]);
});

// Create Activities Group
router.post("/", async (req, res) => {
  const { title, email } = req.body;

  var insertResult = await db.query(
    "INSERT INTO activities (title, email) VALUES (?, ?)",
    [title, email]
  );

  var getResult = await db.query("SELECT * FROM activities WHERE id = ?", [
    insertResult.insertId,
  ]);

  return res.json({
    status: "Success",
    message: "Success",
    data: getResult[0],
  });
});

// Updade Todo
router.patch("/:id", async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const getQuery = await db.query(
    `UPDATE activities SET title = ? WHERE id = ?`,
    [title, id]
  );

  var getResult = await db.query("SELECT * FROM activities WHERE id = ?", [id]);

  return res.json({
    status: "Success",
    message: "Success",
    data: getResult[0],
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const query = await db.query("DELETE FROM activities WHERE id = ?", [id]);

  if (query.affectedRows === 0)
    return res.json({
      status: "Not Found",
      message: `Activities with ID ${id} Not Found`,
    });

  return res.json({
    status: "Success",
    message: `Success delete ID ${id}`,
  });
});

module.exports = router;
