import React, { useState, useEffect } from "react";
import "../Styles/Signin.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Singup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCheck, setEmailcheck] = useState(false);
  const [passwordCheck, setPasswordcheck] = useState(false);
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  // v1
  useEffect(() => {
    console.log("All time render");
  });

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
      setPasswordcheck("Password length must be greater than or equal to 5");
      return;
    } else {
      // email & password is true
      setPasswordcheck(false);
    }
    // sending email & password to backend - for authentication (matching email & password)
    let responseData = await axios.post("/api/signup", {
      username: email,
      password,
    });
    if (responseData.data.Success === 1) {
      console.log("abcd");
      navigate("/signin");
    } else {
      setError(responseData.data.Msg);
      console.log(error);
    }
    console.log("response data : ", responseData.data);
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <div className="title">Sign Up</div>
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
          Sign up
        </button>
        <div style={{ color: "red" }}>
          {emailCheck && <p>{emailCheck}</p>}
          {passwordCheck && <p>{passwordCheck}</p>}
        </div>
        <div className="new-customer">
          Already have an account?
          <Link id="create-account" to="/signin">
            [ Login ]
          </Link>
        </div>
      </div>
    </div>
  );
}
