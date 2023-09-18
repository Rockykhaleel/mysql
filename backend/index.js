// Import the required libraries
var express = require("express");
var app = express();
const mysql = require("mysql");
var bodyParser = require("body-parser");
const cors = require("cors");

// Enable CORS
app.use(cors());

// Create a JSON parser middleware
var jsonParser = bodyParser.json();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "khaleel",
  database: "todoapp",
  connectionLimit: 10,
});

// Define a GET route for retrieving all tasks
app.get("/task", async (req, res) => {
  pool.query("SELECT * FROM tasks", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Define a POST route for adding a new task
app.post("/task", jsonParser, async (req, res) => {
  const { task_name } = req.body;
  pool.query(
    "INSERT INTO tasks ( task_name) VALUES ( ?)",
    [task_name],
    (err, results) => {
      if (err) throw err;
      res.send("Added student successfully!");
    }
  );
});

//Delete route to delete a perticular task with their respective id
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id_tasks = ?", [id]);
    res.json("Task was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server has started!");
});
