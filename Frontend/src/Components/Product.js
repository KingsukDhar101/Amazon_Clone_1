import React, { useContext } from "react";
import CartContext from "../Context/CartContext";

export default function Product({id, name,category,brand,price,image, countInStock, countInCart}) {
  const { addToCart} = useContext(CartContext);
  function handleClick(){
    addToCart(
      id,
      name,
      category,
      brand,
      price,
      image,
      countInStock,
      countInCart
    );
  }
  return (
    <div className="product">
      <div className="sip">
        <div className="img">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="content-product">
        <div className="title">
          <div className="details">
            <div className="product-title">{name}</div>
            <div className="category">{category}</div>
            <div className="brand">{brand}</div>
          </div>
          <div className="wrapper">
            <div className="price">
              <span>Rs.</span>
              <span>{price}</span>
            </div>
            <div className="btn">
              <button onClick={handleClick}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
