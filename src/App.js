import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Resident from "./resident/resident";
import Login from "./login/login";
import Register from "./register/register";
import Package from "./package/package";
import Confirmation from "./confirmation/confirmation";
import NavbarPage from "./navBar/navBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true)
    }
  }
  useEffect(() => {
    checkLogin()
  }, []);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {loggedIn ? <NavbarPage /> : ""}
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/resident" exact component={Resident} />
        <Route path="/register" exact component={Register} />
        <Route path="/package" exact component={Package} />
        <Route path="/confirmation/:id" exact component={Confirmation} />
      </BrowserRouter>
    </div>
  );
}


export default App;
