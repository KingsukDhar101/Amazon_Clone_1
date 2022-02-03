import React, { createRef, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Styles from "../Styles/ProductPage.module.css";
import CartContext from "../Context/CartContext";

export default function ProductPage() {
  let { cart, addToCart, addToCartByValue } = useContext(CartContext);
  let params = useParams();
  const [product, setProduct] = useState({});
  // let id = product._id;

  const selectRef = createRef();
  // let refValue = selectRef.current.value;
  console.log("Cart : ", cart);
  let cartItem = cart.filter((item) => item.id === params.id);
  console.log("CartItem : ", cartItem);

  function add__to__cart() {
    console.log("ref value : ", selectRef.current.value);
    let refValue = selectRef.current.value;
    console.log("product :(before) : ", product);

    // setProduct({countInCart:});
    console.log("product : ", product);
    const {
      id,
      name,
      category,
      brand,
      price,
      image,
      countInStock,
      countInCart,
    } = product;
    console.log("added value : ", +countInCart + +refValue);
    if (product.countInStock >=( +refValue + +product.countInCart)) {
      addToCartByValue(
        id,
        name,
        category,
        brand,
        price,
        image,
        countInStock,
        countInCart,
        refValue
      );
      console.log("Product : (after check) : green signal ", product);
    } else {
      alert(
        "Items cannot be added more than items in stocks. Please add lesser items."
      );
      return;
    }

    console.log("product :(after) : ", product);
  }

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("user"));

    // calling with Token
    let reponseData = await axios.get(`/api/product/${params.id}`, {
      headers: {
        Authorization: `${user.Token}`,
      },
    });
    console.log("Response Data : ", reponseData);

    console.log("Cart : ", cart);
    if (reponseData.data.product) {
      setProduct(cartItem[0]);
    }
  }, []);

  if (localStorage.getItem("user") == null) {
    return (
      <div className="content">
        <Link to="/signin">Please Login</Link>
      </div>
    );
  }

  return (
    <>
      <div className="content">
        <Link
          to={"/"}
          style={{
            marginRight: "auto",
            background: "grey",
            color: "white",
            padding: "5px",
            borderRadius: "50%",
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </Link>
        <div className={Styles.container}>
          <div className={Styles.div__img}>
            {console.log("Product : ", product)}
            <img src={product.image} alt="" />
          </div>
          <div className={Styles.product__details}>
            <h2>{product.name}</h2>
            <p className={Styles.product__category}>{product.category}</p>
            <p className={Styles.product__price_wrapper}>
              Price:{" "}
              <span className={Styles.product__price}>{product.price}</span>
            </p>
            <p className={Styles.product__description}>
              Description: {product.description}
            </p>
          </div>
          <div className={Styles.div__last}>
            <div className={Styles.add__to__cart}>
              {product.countInStock > 0 ? (
                <>
                  <div className={Styles.in__stock}>In Stock</div>
                  <div className={Styles.quantity_wrapper}>
                    <div className={Styles.quantity}>Quantity</div>
                    <span>
                      <select className={Styles.quantity} ref={selectRef}>
                        <option>Select</option>
                        {[...Array(product.countInStock).keys()].map((ele) => (
                          <option key={ele + 1} value={ele + 1}>
                            {ele + 1}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <button
                    className={Styles.add__to__cart__btn}
                    onClick={add__to__cart}
                  >
                    Add to cart
                  </button>
                </>
              ) : (
                <div className={Styles.out__of__stock}>Out of Stock</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
