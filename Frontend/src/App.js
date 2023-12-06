import React, { useState } from "react";
import { LoginSignup } from "./components/LoginSignup";
import { Wrapper } from "./components/Wrapper";

import './App.css';
import './LoginSignup.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Wrapper />
      ) : (
        <LoginSignup onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
