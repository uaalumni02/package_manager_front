import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Resident from "./resident/resident";
import Login from "./login/login";
import Register from "./register/register";
import Package from "./package/package";
import Confirmation from "./confirmation/confirmation";
import NavbarPage from "./navBar/navBar";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <UserContextProvider>
          <NavbarPage />
          {/* <div>{loggedIn ? <NavbarPage /> : ""}</div> */}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/resident" component={Resident} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/package" component={Package} />
            <Route exact path="/confirmation/:id" component={Confirmation} />
          </Switch>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
