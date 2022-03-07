const data = require("../data");
const {getCategories, getSingleProduct, getAllProducts} = require('../Utils/ProductUtil');
let productRouter = require("express").Router();

productRouter.get("/categories", (req, res)=>{
  getCategories()
    .then(result =>{
     res.json({
       Success: 1,
       result
     });
    })
    .catch(error => {
      res.json({
        Success: 0,
        Msg: error
      });
    });  
});

// productRouter.get("/", (req, res) => {
//   console.log("in product router : (backend) :");
//   let product = await getAllProducts(id);
//   if (product) {
//     console.log("product : ", product);
//     res.json({
//       Success: 1,
//       Msg: "Product found.",
//       product,
//     });
//   } else {
//     res.json({
//       Success: 0,
//       Msg: "Product not found.",
//     });
//   }
// });

productRouter.get("/:id", async (req, res) => {
  // console.log("in product router : (backend) :");
  let { id } = req.params;
  let product = await getSingleProduct(id);
  if (product) {
    // console.log("product : ",product);
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
