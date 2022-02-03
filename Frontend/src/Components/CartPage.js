import React, { useState, useContext, useEffect } from "react";
import CartpageItem from "./CartpageItem";
import "../Styles/CartPage.css";
import CartContext from "../Context/CartContext";
import data from "../data";

export default function CartPage() {
  const { cart, total, setTotal } = useContext(CartContext);
  console.log("Cart : ", cart);

  // for(let i=0; i<cart.length; i++){

  // }
 
  console.log("Total : ", total);
  let cartItems = cart.map((item) => (
    <CartpageItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      countInStock={item.countInStock}
      countInCart={item.countInCart}
      image={item.image}
    />
  ));
  return (
    <div className="cartpage-container">
      <h3>Items in Cart</h3>
      {cartItems}
      <h3>Total cost of cart : {total}</h3>
    </div>
  );
}
