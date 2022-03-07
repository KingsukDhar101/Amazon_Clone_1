let client = require("../db");
const bcrypt = require("bcrypt");

module.exports.insert = async (username, password) => {
  try {
    let result = await client.query(
      "insert into login (username, password) values($1, $2)",
      [username, password]
    );

    return result;
  } catch (error) {
    // console.log(error);
    return {
      Success: 0,
      Msg: "User already exists.",
    };
  }
};

module.exports.find = async (username, password) => {
  try {
    let result = await client.query("select * from login where username = $1", [username]);
    // console.log("Result : ", result);
    if (result.rows[0]) {
      const pwCheck = await bcrypt.compare(password, result.rows[0].password);
      if (pwCheck) {
        return {
          Success: 1,
          Msg: "Login Successful",
        };
      } else {
        return {
          Success: 0,
          Msg: "Invalid Password",
        };
      }
    } else {
      return {
        Success: 0,
        Msg: "Invalid Email",
      };
    }
  } catch (error) {
    return {
      Success: 0,
      Msg: "invalid credentials",
    };
  }
};
