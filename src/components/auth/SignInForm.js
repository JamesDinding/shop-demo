import { Fragment, useState, useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./SignInForm.module.css";
import Card from "../UI/Card";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../configuration";

const SignInForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const emailInputRef = useRef(null);
  const psInputRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const psInput = psInputRef.current.value;

    //basic validation if needed, i just ignore here;

    const url = isSignIn ? SIGN_IN_URL : SIGN_UP_URL;

    //IIFE
    // (async function sign(url) {
    //   try {
    //     const response = await fetch(url, {
    //       method: "POST",
    //       body: JSON.stringify({
    //         email: emailInput,
    //         password: psInput,
    //         returnSecureToken: true,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const data = await response.json();
    //     console.log(data.error.message);

    //     if (!response.ok) {
    //       throw new Error(data.error.message || "Fetch Failed");
    //     }
    //     AuthCtx.login(data.idToken);
    //     history.replace("/products");
    //   } catch (err) {
    //     alert(err.message);
    //   }
    // })(url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: psInput,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message || "Authentication Failed");
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, data.email, expirationTime.toISOString());

        history.replace("/products");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const psInputHandler = (event) => {
    if (event.key === "Enter") event.preventDefault();
  };

  const switchSignHandler = (event) => {
    event.preventDefault();

    setIsSignIn((prevState) => !prevState);
  };

  return (
    <Fragment>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" ref={emailInputRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="pw">Password</label>
            <input
              type="text"
              id="pw"
              minLength="7"
              maxLength="20"
              ref={psInputRef}
              onKeyPress={psInputHandler}
              required
            />
          </div>
          <div className={classes.actions}>
            <button className={classes.signup} onClick={switchSignHandler}>
              {isSignIn
                ? "Don't have an account? Sign up"
                : "Have an account already?Sign In"}
            </button>
            <button className="btn">{isSignIn ? "Sign In" : "Sign Up"}</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default SignInForm;
