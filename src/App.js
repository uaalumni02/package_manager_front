import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Resident from "./resident/resident";
import Login from "./login/login";
import Register from "./register/register";
import Package from "./package/package";
import Confirmation from "./confirmation/confirmation";
import AllPackages from "./allPackages/allPackages";
import UserContextProvider from "./contexts/UserContext";
import AllResidents from "./allResidents/allResidents";
import EditResident from "./editResident/editResident";
import EditPackage from "./editPackage/editPackage";
import AdminApproval from "./adminApproval/adminApproval";
import AdminLogin from "./adminLogin/adminLogin";
import Admins from "./admin/admin";

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
            <Route exact path="/adminApproval" component={AdminApproval} />
            <Route exact path="/adminLogin" component={AdminLogin} />
            <Route exact path="/admins" component={Admins} />
          </Switch>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
