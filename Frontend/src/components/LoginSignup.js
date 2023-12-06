import React, { useState } from "react";
import email_icon from "./asserts/email.png";
import password_icon from "./asserts/password.png";
import axios from "axios"; // Import axios for making HTTP requests

export const LoginSignup = ({ onLogin }) => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      onLogin();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("/signup", {
        email: email,
        password: password,
      });

      handleLogin();
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <div className="LoginSignup">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="Email icon"></img>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="Password icon"></img>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="sub-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            handleSignup();
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
            handleLogin();
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
