const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const allowOrigin = require("./Middleware/allowOrigin");
const loginRouter = require("./Controllers/LoginController");
const data = require("./data");
const productRouter = require("./Controllers/ProductController");
const verifyToken = require("./Middleware/verifyToken");
const { getAllProducts } = require("./Utils/ProductUtil");

// allow cors
app.use(allowOrigin);

app.use(express.json());

app.use(express.static(__dirname + "/build"));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.json({
    Msg: "get response...",
  });
});

// app.use("/data", (req, res) => {
//   res.json({ data });
// });

////////////////////// Routes  ///////////////

// login
app.use("/api", loginRouter);

// products
app.use("/api/product", verifyToken, productRouter);
app.get("/data", async (req, res) => {
  let result = await getAllProducts();
  res.json({
    Success: 1,
    Products: result,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
