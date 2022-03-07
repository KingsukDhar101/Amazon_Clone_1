import React, { useState, useEffect, useContext } from "react";
import "../Styles/Signin.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../Context/UserContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailcheck] = useState(false);
  const [passwordCheck, setPasswordcheck] = useState(false);
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  let navigate = useNavigate();
  // v1
  // useEffect(() => {
  //   console.log("All time render");
  // });

  // v2
  useEffect(() => {
    console.log("One time render");
  }, []);

  // v3 : render only for dependency array
  useEffect(() => {
    console.log("render for : email");
  }, [email]);

  useEffect(() => {
    console.log("render for : password");
  }, [password]);

  // v4
  useEffect(() => {
    return function () {
      console.log("Unmount");
    };
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log("Email : ", email);
    console.log("Password : ", password);
    if (!email.includes("@") || !email.includes(".")) {
      setEmailcheck("Enter correct email");
      return;
    } else {
      setEmailcheck(false);
    }

    if (password.length < 5) {
      setPasswordcheck("Password length must be greater than 5");
      return;
    } else {
      // email & password is true
      setPasswordcheck(false);
    }
    // sending email & password to backend - for authentication (matching email & password)
    let responseData = await axios.post("/api/login", {
      username: email,
      password,
    });
    if (responseData.data.Success === 1) {
      setUser(responseData.data);
      console.log("Navigating to Homepage");
      localStorage.setItem("user", JSON.stringify(responseData.data));
      navigate("/");
    } else {
      setError(responseData.data.Msg);
    }
    console.log("response data : ", responseData.data);
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="title">Sign In</div>
        <div className="email-container">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="signin-btn" onClick={handleSignin}>
          Sign In
        </button>
        <div style={{ color: "red" }}>
          {emailCheck && <p>{emailCheck}</p>}
          {passwordCheck && <p>{passwordCheck}</p>}
        </div>
        <div className="new-customer">
          New customer?
          <Link id="create-account" to="/signup">
            Create your account
          </Link>
        </div>
      </div>
    </div>
  );
}
