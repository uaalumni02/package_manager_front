import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Package from "./package/package";
import Login from "./login/login";
import NavbarPage from "./navBar/navBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarPage />
      </header>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/package" exact component={Package} />
      </BrowserRouter>
    </div>
  );
}

export default App;
