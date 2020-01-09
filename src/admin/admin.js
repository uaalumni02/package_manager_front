import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavbarPage from "../navBar/navBar";

const Admins = () => {
    const { loggedIn } = useContext(UserContext);
  return (
    <>
      <div>{loggedIn ? <NavbarPage /> : ""}</div>
      <header className="logo">
        <img
          src="https://chris180.org/wp-content/uploads/2016/08/Logo-450x200.png"
          alt="main logo"
          className="center"
        />
      </header>
      <br></br>
    </>
  );
};

export default Admins;
