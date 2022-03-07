import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import FilterContext from "./FilterContext";
import CartContext from "./CartContext";
import SidebarContext from "./SidebarContext";

export default function ContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [productArr, setProductArr] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    category: "",
  });
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  let totalPrice = 0;
  useEffect(() => {
    cart.map((item) => {
      totalPrice += item.countInCart * item.price;
      setTotal(totalPrice);
    });

    if (cart.length == 0) {
      setTotal(0);
    }
  }, [cart]);

  console.log("Total price : ", total);

  function addToCart(
    id,
    name,
    category,
    brand,
    price,
    image,
    countInStock,
    countInCart
  ) {
    console.log("Cart-@first: ", cart);
    if (countInStock === 0) return;
    let search = cart.find((item) => item.id === id);
    if (search && search.countInStock > search.countInCart) {
      search.countInCart += 1;
      console.log("Search-after-filter: ", search);
      setCart([...cart]);
      console.log("Cart: ", cart);
    } else {
      cart.push({
        id,
        name,
        category,
        brand,
        price,
        image,
        countInStock,
        countInCart,
      });
      setCart([...cart]);
    }
    console.log("cart-@last: ", cart);
  }

  function addToCartByValue(
    id,
    name,
    category,
    brand,
    price,
    image,
    countInStock,
    countInCart,
    refValue
  ) {
    if (countInStock === 0) return;
    let search = cart.find((item) => item.id === id);
    if (search && search.countInStock >= search.countInCart && refValue) {
      search.countInCart += +refValue;
      setCart([...cart]);
    } else {
      cart.push({
        id,
        name,
        category,
        brand,
        price,
        image,
        countInStock,
        countInCart,
      });
      setCart([...cart]);
    }
    console.log(cart);
  }

  function removeOne(id) {
    let search = cart.find((item) => item.id === id);
    if (search.countInCart > 1) {
      search.countInCart -= 1;
      setCart([...cart]);
    } else {
      removeFromCart(id);
    }
  }

  function addOne(id) {
    let search = cart.find((item) => item.id === id);
    if (search.countInStock > search.countInCart) {
      search.countInCart += 1;
      setCart([...cart]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartByValue,
        removeFromCart,
        removeFromCart,
        removeOne,
        addOne,
        total,
        setTotal,
      }}
    >
      <FilterContext.Provider value={{ filter, setFilter }}>
        <UserContext.Provider
          value={{ user, setUser, productArr, setProductArr }}
        >
          <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
          </SidebarContext.Provider>
        </UserContext.Provider>
      </FilterContext.Provider>
    </CartContext.Provider>
  );
}
