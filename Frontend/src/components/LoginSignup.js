// import { Wrapper } from './components/Wrapper';

import { useState } from "react";
import email_icon from "./asserts/email.png";
import password_icon from "./asserts/password.png";
export const LoginSignup = () => {

const [action, setAction] = useState("Sign Up");
  return (
    <div className="LoginSignup">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt=""></img>
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt=""></img>
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div className="sub-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
    </div>
  );
};

export default LoginSignup;
