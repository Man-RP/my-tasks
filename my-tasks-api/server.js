const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
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
