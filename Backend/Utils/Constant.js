const passwordValidator = require("password-validator");
let schema = new passwordValidator();

schema.is().min(5);

// schema
//   .is().min(5)
//   .is().max(100)
//   .has().uppercase()
//   .has().lowercase();

module.exports.schema = schema;
module.exports.emailValidator = /\S+@\S+\.\S+/;
