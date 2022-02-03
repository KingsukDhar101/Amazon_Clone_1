const data = require("../data");
let productRouter = require("express").Router();

productRouter.get("/:id", (req, res) => {
  console.log("in product router : (backend) :");
  let { id } = req.params;
  let product = data.products.find((ele) => ele._id === id);
  if (product) {
    console.log("product : ",product);
    res.json({
      Success: 1,
      Msg: "Product found.",
      product,
    });
  } else {
    res.json({
      Success: 0,
      Msg: "Product not found.",
    });
  }
});

module.exports = productRouter;
