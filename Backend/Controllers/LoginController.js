let loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../Utils/SECRET");
const { emailValidator } = require("../Utils/Constant");
const { schema } = require("../Utils/Constant");
const LoginMiddleware = require("../Middleware/LoginMiddleware");
let db = [
  // { username: "admin@admin.com", password: "1234567" },
  // { username: "user@user", password: "1234567" },
];

loginRouter.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let result = db.find((user) => user.username === username);
  // console.log(result);
  if (result) {
    const pwCheck = await bcrypt.compare(password, result.password);
    if (pwCheck) {
      const Token = jwt.sign({ username, password }, SECRET, {
        expiresIn: "1hr",
      });
      res.json({
        Msg: "Login successfull",
        Sucess: 1,
        Token,
        Username: username,
      });
    } else {
      res.json({
        Msg: "Invalid password",
        Sucess: 0,
      });
    }
  } else {
    res.json({
      Msg: "Login failed",
      Sucess: 0,
    });
  }
});

loginRouter.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  const isEmailValid = emailValidator.test(username);
  if (isEmailValid) {
    const isPasswordValid = schema.validate(password);
    if (isPasswordValid) {
      password = await bcrypt.hash(password, 10);
      const Token = jwt.sign({ username, password }, SECRET, {
        expiresIn: "1hr",
      });
      db.push({ username, password });
      res.json({
        Msg: "Signup successful",
        Success: 1,
        Token,
      });
    } else {
      res.json({
        Msg: "Password length must be greater than or equal to 5",
        Success: 0,
      });
    }
  } else {
    res.json({
      Msg: "username is not valid",
      Success: 0,
    });
  }
});

module.exports = loginRouter;
