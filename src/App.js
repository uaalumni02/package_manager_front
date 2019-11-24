import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    checkLogin();
  });
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <BrowserRouter>
        <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/resident" component={Resident} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/package" component={Package} />
        <Route exact path="/confirmation/:id" component={Confirmation} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
