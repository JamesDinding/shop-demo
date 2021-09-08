import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  wish: [],
  addWish: (id) => {},
  removeWish: (id) => {},
  login: (token, email, expirationTime) => {},
  logout: () => {},
});

//Helper func
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;
  return remainingTime;
};

let logoutTimer;

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedEmail = localStorage.getItem("email");

  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 600000) {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    email: storedEmail,

    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  //get token/email/expirationTime from localStorage
  const tokenData = retrieveStoredToken();

  let initialToken = tokenData?.token;
  let initialEmail = tokenData?.email;
  let initialWish = [];
  if (tokenData?.wish) initialWish = tokenData.wish.slice();

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [wish, setwish] = useState(initialWish);
  const userIsLoggenIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, email, expirationTime) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    //auto logout
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const addWishHandler = (wishObj) => {
    let arr = wish.slice();
    if (!!arr.find((el) => el?.id === wishObj.id)) return;

    arr.push(wishObj);

    setwish(arr);
  };

  const removeWishHandler = (wishID) => {
    let arr = wish.slice();

    arr = arr.filter((el) => el.id !== wishID);
    setwish(arr);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggenIn,
    email: email,
    wish: wish,
    addWish: addWishHandler,
    removeWish: removeWishHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
