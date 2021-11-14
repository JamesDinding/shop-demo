import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [showWish, setShowWish] = useState(false);

  const showWishHandler = () => {
    setShowWish(true);
  };

  const closeWishHandler = () => {
    setShowWish(false);
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    authCtx.logout();
    history.replace("/products");
  };

  const leadToWishPageHandler = () => {
    history.replace("/wish");
  };

  const logoutHtml = (
    <Fragment>
      <li>
        <Link to="/add-product">Upload</Link>
      </li>
      <li>
        <button className={classes.logout} onClick={logoutHandler}>
          Out
        </button>
      </li>
    </Fragment>
  );

  const loginHtml = (
    <li>
      <Link to="/log-in">Sign</Link>
    </li>
  );

  let showWishCss = showWish
    ? `${classes["drop-container"]} ${classes.show}`
    : `${classes["drop-container"]}`;

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Shop</div>
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/products">Shop</Link>
          </li>
          <li onMouseEnter={showWishHandler}>
            <div className={classes.wish}>
              <Link to="/wish">Wish</Link>

              <div
                className={showWishCss}
                onMouseEnter={showWishHandler}
                onMouseLeave={closeWishHandler}
              >
                {authCtx.wish.length === 0 ? (
                  <span className={classes.emptywish}>去逛逛!</span>
                ) : (
                  authCtx.wish.map((cur, index, arr) => {
                    return (
                      <div
                        key={index}
                        className={classes["wish-item"]}
                        id={cur.id}
                        onClick={leadToWishPageHandler}
                      >
                        <img src={cur.product_url} alt="pic not found💩" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </li>
          {authCtx.isLoggedIn ? logoutHtml : loginHtml}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
