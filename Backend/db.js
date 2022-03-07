const pg = require("pg");
const config = {
  host: "b6vafaeea3k5dis5xomf-postgresql.services.clever-cloud.com",
  port: 5432,
  user: "ugoi3ckiivlgx0jh8sjg",
  database: "b6vafaeea3k5dis5xomf",
  password: "tvVO8fAlG7WxYLrvwgs1",
};

const client = new pg.Client(config);
client.connect();
module.exports = client;
