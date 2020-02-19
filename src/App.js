import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Resident from "./pages/resident";
import Login from "./pages/login";
import Register from "./pages/register";
import Package from "./pages/package";
import Confirmation from "./confirmation/confirmation";
import AllPackages from "./pages/allPackages";
import UserContextProvider from "./contexts/UserContext";
import AllResidents from "./pages/allResidents";
import EditResident from "./pages/editResident";
import EditPackage from "./pages/editPackage";
import ApprovalMessage from "./components/ApprovalMessage";
import AdminLogin from "./pages/adminLogin";
import Admins from "./pages/admin";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <UserContextProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/resident" component={Resident} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/package" component={Package} />
            <Route exact path="/confirmation/:id" component={Confirmation} />
            <Route exact path="/allPackages" component={AllPackages} />
            <Route exact path="/allResidents" component={AllResidents} />
            <Route exact path="/editResident/:id" component={EditResident} />
            <Route exact path="/editPackage/:id" component={EditPackage} />
            <Route exact path="/adminApproval" component={ApprovalMessage} />
            <Route exact path="/adminLogin" component={AdminLogin} />
            <Route exact path="/admins/" component={Admins} />
          </Switch>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
