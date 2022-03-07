import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterContext from "../Context/FilterContext";
import UserContext from "../Context/UserContext";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import Sidebar from "./Sidebar";
import SidebarContext from "../Context/SidebarContext";
import Logout from "./Logout";

export default function Header() {
  let { user, setUser } = useContext(UserContext);
  // let { filter, setFilter } = useContext(FilterContext);
  let { open, setOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userData = JSON.parse(localStorage.getItem("user"));
      console.log(userData.Username);
      setUser(userData);
    }
  }, []);

  return (
    <div className="header">
      <div className="header-container">
        <div
          className="hamburger"
          onClick={() => {
            setOpen(true);
          }}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        {open && <Sidebar />}
        <div className="logo-container">
          <Link className="logo" to="/">
            Amazon
          </Link>
        </div>
        <div className="address-container">
          <i className="material-icons">location_on</i>
          <div className="line-container">
            <div className="line-1">Hello</div>
            <div className="line-2">Select your address</div>
          </div>
        </div>
        <div className="search-container">
          <SearchBar />
          <div className="search-icon">
            <i className="fa fa-search"></i>
          </div>
        </div>
        <div className="last-items">
          {/* <div className="item">Country</div> */}
          {/* <div className="item">Account</div> */}
          <div className="item">
            <Link
              classname="cartpage"
              to="/cartpage"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Cart />
            </Link>
          </div>
          <div className="item">
            {user == null ? (
              <Link className="signin" to="/signin">
                Signin
              </Link>
            ) : (
              user.Username
            )}
          </div>
          {user !== null ? 
            <div className="item">
              <Logout />
            </div> :
            null
          } 
        </div>
      </div>
    </div>
  );
}
