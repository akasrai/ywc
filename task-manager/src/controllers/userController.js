import { Router } from "express";
import authenticate from "../middlewares/authMiddleware.js";

const userController = Router();

userController.post("/login", authenticate, (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

export default userController;
