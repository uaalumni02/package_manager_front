import React, { Component } from "react";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

import { BrowserRouter, Link } from "react-router-dom";

class NavbarPage extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logOut = () => {
    localStorage.clear();
  };

  render() {
    return (
    
      // <Link to={'/register'}>OOOOOO</Link>
      <>
        <MDBNavbar color="grey" dark expand="lg">
          <MDBNavbarBrand>
            <strong className="white-text">Navbar</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to={"/package/"} >Delivery</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#!">Features</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink   to={"/"} onClick={this.logOut}>Log Out</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownMenu>
                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                    <MDBDropdownItem href="#!">
                      Something else here
                    </MDBDropdownItem>
                    <MDBDropdownItem href="#!">
                      Something else here
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves></MDBFormInline>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </>
    );
  }
}

export default NavbarPage;
