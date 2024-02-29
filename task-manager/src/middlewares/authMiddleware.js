import users from "../models/users.js";

const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default authenticate;
