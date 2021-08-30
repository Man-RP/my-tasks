const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Task = require("./models/task");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", async (req, res) => {
  console.log("TRYING TO FETCH TASKS");

  try {
    const tasks = await Task.find();
    res.status(200).json({
      tasks: tasks.map((task) => ({
        id: task.id,
        text: task.text,
      })),
    });
    console.log("FETCHED TASKS");
  } catch (err) {
    console.error("ERROR FETCHING TASKS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load tasks." });
  }
});

app.post("/tasks", async (req, res) => {
  console.log("TRYING TO STORE TASK");
  const taskText = req.body.text;

  if (!taskText || taskText.trim().length === 0) {
    console.log("INVALID INPUT - NO TEXT");
    return res.status(422).json({ message: "Invalid goal text." });
  }

  const task = new Task({
    text: taskText,
  });

  try {
    await task.save();
    res
      .status(201)
      .json({ message: "Task saved", task: { id: task.id, text: taskText } });
    console.log("STORED NEW TASK");
  } catch (err) {
    console.error("ERROR FETCHING TASKS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to save task." });
  }
});

app.get("/tasks", async (req, res) => {
  console.log("TRYING TO FETCH TASKS");

  try {
    const tasks = await Task.find();
    res.status(200).json({
      tasks: tasks.map((task) => ({
        id: task.id,
        text: task.text,
      })),
    });
    console.log("FETCHED TASKS");
  } catch (err) {
    console.error("ERROR FETCHING TASKS");
    console.error(err.message);
    res.status(500).json({ message: "Failed to load tasks." });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  console.log("TRYING TO DELETE TASK");
  const taskId = req.params.id;

  try {
    await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: "Task deleted" });
    console.log("DELETED TASK");
  } catch (err) {
    console.error("ERROR DELETING TASK");
    console.error(err.message);
    res.status(500).json({ message: "Failed to delete task." });
  }
});

mongoose.connect(
  `mongodb://localhost:27017/my-tasks`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB!!");
      app.listen(port);
    }
  }
);
