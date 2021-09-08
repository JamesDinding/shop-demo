import React, { Fragment, useContext, useState } from "react";
import classes from "./AllWish.module.css";
import AuthContext from "../../store/auth-context";
import Purchase from "../shop/Purchase";

let targetID = "";

const AllWish = () => {
  const authCtx = useContext(AuthContext);
  const [popPurchase, setPopPurchase] = useState(false);

  const popPurchaseHandler = (event) => {
    targetID = event.target.closest("div").id;
    setPopPurchase(true);
  };

  const shutPurchaseHandler = () => {
    setPopPurchase(false);
  };

  const addToWishHandler = (event) => {
    const targetID = event.target.closest("div").id;
    const wishObj = authCtx.wish.find((el) => el.id === targetID);
    let been = false;

    authCtx.wish.forEach((el) => {
      if (el.id?.includes(targetID)) {
        been = true;
      }
    });
    if (!been) {
      authCtx.addWish(wishObj);
    } else {
      authCtx.removeWish(targetID);
    }
  };

  return (
    <Fragment>
      {popPurchase && (
        <Purchase
          onShut={shutPurchaseHandler}
          ID={targetID}
          purchaseData={authCtx.wish}
        />
      )}
      <div className={classes["product-container"]}>
        {authCtx.wish.length !== 0 ? (
          authCtx.wish.map((cur, index, arr) => {
            return (
              <div className={classes["product-item"]} key={index}>
                <img
                  src={cur.product_url}
                  alt="💩PIC NOT Found"
                  className={classes["product-img"]}
                />
                <div className={classes["product-name"]}>
                  {cur.product_name}
                </div>
                <div className={classes["price-container"]}>
                  價格:
                  <span className={classes["price-price"]}>
                    {cur.product_price}
                  </span>
                  剩餘數量:
                  <span className={classes["remaining-num"]}>
                    {cur.remaining_num}
                  </span>
                </div>
                <div id={cur.id}>
                  <button onClick={popPurchaseHandler} className="btn">
                    Purchase
                  </button>
                  <button onClick={addToWishHandler} className={classes.wish}>
                    {authCtx.wish.find((el) => el.id === cur.id) ? (
                      <img
                        className={classes.heart}
                        src="/img/iconmonstr-favorite-3-24.png"
                      />
                    ) : (
                      <img
                        className={classes.heart}
                        src="/img/iconmonstr-heart-thin-24.png"
                      />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>GO TO SHOP</h1>
        )}
      </div>
    </Fragment>
  );
};

export default AllWish;
