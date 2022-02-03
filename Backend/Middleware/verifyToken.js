let jwt = require("jsonwebtoken");
const {SECRET} = require("../Utils/SECRET");

module.exports = function (req, res, next){
  let Token = req.headers.authorization;
  if(Token){
    jwt.verify(Token, SECRET, (err, decoded)=>{
      if(err){
        res.json({
          Success : 0,
          Msg : "Token is invalid"
        });
      }else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    res.json({
      Success : 0,
      Msg : "Token is not provided"
    });
  }
};