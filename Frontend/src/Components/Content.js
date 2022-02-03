import React, { useState, useEffect, useContext } from "react";
import Product from "./Product";
// import data from "../data.js";
import axios from "axios";
import UserContext from "../Context/UserContext";
import FilterContext from "../Context/FilterContext";

export default function Content() {
  const { productArr, setProductArr } = useContext(UserContext);
  const {
    filter: { search },
  } = useContext(FilterContext);
  const {
    filter: { category },
  } = useContext(FilterContext);

  useEffect(async () => {
    console.log("render one time");
    let responseData = await axios.get("/data");
    setProductArr(responseData.data.data.products);
    console.log(responseData.data.data.products);
  }, []);

  let newArr = productArr.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  let newArrFilterCategory = newArr.filter((product) =>
    product.category.includes(category)
  );
  // console.log("NewArr : ",newArr);

  return (
    <div className="content">
      {productArr.length === 0
        ? "Loading..."
        : newArrFilterCategory.length === 0
        ? "no products found"
        : newArrFilterCategory.map((product) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              category={product.category}
              brand={product.brand}
              price={product.price}
              image={product.image}
              countInStock={product.countInStock}
              countInCart={product.countInCart}
            />
          ))}
      {/* {console.log("newArrFilterCategory : ", newArrFilterCategory)} */}
    </div>
  );
}
