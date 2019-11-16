import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Resident from "./resident/resident";
import Login from "./login/login";
import Register from "./register/register";
import Package from "./package/package";
import NavbarPage from "./navBar/navBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarPage />
      </header>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/resident" exact component={Resident} />
        <Route path="/register" exact component={Register} />
        <Route path="/package" exact component={Package} />
      </BrowserRouter>
    </div>
  );
}

export default App;
