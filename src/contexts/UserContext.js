import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState("");
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token) {
      setLoggedIn(true);
      setUser(userName);
    }
  };
  useEffect(() => {
    checkLogin();
  });
  return (
    <UserContext.Provider value={{ loggedIn, checkLogin, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
