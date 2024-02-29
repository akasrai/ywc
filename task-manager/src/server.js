import cors from "cors";
import express from "express";

import connectToMongoDB from "./config/db.js";
import userController from "./controllers/userController.js";
import taskController from "./controllers/taskController.js";
import studentController from "./controllers/studentController.js";

const app = express();
const port = 8080;

app.use(cors());
app.set("port", port);
app.use(express.json());

connectToMongoDB();

app.get("/hello", (req, res) => {
  res.send("Hello, world!");
});

app.get("/json", (req, res) => {
  const data = {
    data: "Hello world!",
  };

  res.status(200).json(data);
});

app.use("/api/students", studentController);
app.use("/api/tasks", taskController);

app.listen(port, () => {
  console.log(`REST API application is running on port ${port}.`);
});
