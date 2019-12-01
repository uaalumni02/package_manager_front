import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
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
    <UserContext.Provider value={{ loggedIn, checkLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
