import React, { useContext } from "react";
import CartContext from "../Context/CartContext";

export default function Cart() {
  let sum = 0;
  const { cart } = useContext(CartContext);
  sum = cart.reduce((acc, item) => acc + item.countInCart, 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>Cart</div>
      <span
        style={{
          backgroundColor: "lightyellow",
          color: "black",
          border: "1px solid white",
          padding: "2px",
          marginLeft: "5px",
        }}
      >
        {sum}
      </span>
    </div>
  );
}
