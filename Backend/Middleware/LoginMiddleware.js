const LoginMiddleware = (req, res, next) => {
  let { username, password } = req.body;

  if (username == "" || password == "") {
    res.json({
      Success: 0,
      Msg: "Email and password are required",
    });
  }

  if (!username.includes("@")) {
    res.json({
      Success: 0,
      Msg: "Invalid Email",
    });
  }

  if (password.length < 5) {
    res.json({
      Success: 0,
      Msg: "Password must be at least 5 characters",
    });
  }

  next();
};

module.exports = LoginMiddleware;
