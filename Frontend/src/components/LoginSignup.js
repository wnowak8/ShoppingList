import React, { useState } from "react";

import email_icon from "./asserts/email.png";
import password_icon from "./asserts/password.png";

import { signup, login } from "../utils/HandleApi";

export const LoginSignup = ({ onLoginSuccess }) => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSignup = async () => {
    try {
      await signup(email, password);
      setMessage({ type: 'success', text: 'User added successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error during signup' });
      console.error("Error during signup:", error);
    }
  };

  const handleLogin = async () => {
    try {
      if (action === "Login") {
        const result = await login(email, password);
        localStorage.setItem('token', result.token);
        console.log("Login successful");
        onLoginSuccess();
      } else {
        setAction("Login");
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error during login' });
      console.error("Error during login:", error);
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
        {message && (
        <div className={message.type === 'error' ? 'error-message' : 'success-message'}>
          {message.text}
        </div>
      )}
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
