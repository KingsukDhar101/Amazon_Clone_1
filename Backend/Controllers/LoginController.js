let loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../Utils/SECRET");
const { emailValidator } = require("../Utils/Constant");
const { schema } = require("../Utils/Constant");
const LoginMiddleware = require("../Middleware/LoginMiddleware");
const { insert, find } = require("../Utils/LoginUtil");
// let db = [
//   // { username: "admin@admin.com", password: "1234567" },
//   // { username: "user@user", password: "1234567" },
// ];

loginRouter.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let result = await find(username, password);
  // let result = db.find((user) => user.username === username);
  // console.log(result);

  if (result.Success == 1) {
    let Token = jwt.sign({ result }, SECRET);
    res.json({
      Success: 1,
      Msg: "Login Successfull",
      Token,
    });
  } else {
    res.json({
      Success: 0,
      Msg: result.Msg,
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
      let result = await insert(username, password);
      // console.log(result);
      if (result.Success === 0) {
        res.json({
          Success: 0,
          Msg: result.Msg,
        });
      } else {
        res.json({
          Msg: "Signup successful",
          Success: 1,
          Token,
          Username: username,
        });
      }
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
