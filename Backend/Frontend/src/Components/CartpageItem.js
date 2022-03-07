import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";

import "../Styles/CartPageItem.css";

export default function CartpageItem({
  id,
  name,
  price,
  countInStock,
  countInCart,
  image,
}) {
  const [count, setCount] = useState(countInCart);
  const { cart, removeFromCart, removeOne, addOne, total, setTotal } = useContext(CartContext);
  const increase = () => {
    addOne(id);
  };
  const decrease = () => {
    removeOne(id);
  };

  return (
    <>
      <div className="cartpage-item">
        <img src={image} className="item-img" />
        <div className="item-name">
          <Link to={`/api/product/${id}`}>{name}</Link>
        </div>
        <div className="item-price">{price}</div>
        <div className="item-quantity">
          <button className="quantity-btn" onClick={decrease}>
            -
          </button>
          <span className="item-count">{countInCart}</span>
          <button className="quantity-btn" onClick={increase}>
            +
          </button>
        </div>
        <div className="delete-btn">
          <button
            onClick={() => {
              removeFromCart(id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
}
