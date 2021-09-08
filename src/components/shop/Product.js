import React, { useState, useEffect, Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Purchase from "./Purchase";
import useHttp from "../../hooks/use-http";
import { getAllProducts } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./Product.module.css";
let targetID = "";

const Product = () => {
  const { sendRequest, data, status, error } = useHttp(getAllProducts, true);
  const [popPurchase, setPopPurchase] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const popPurchaseHandler = (event) => {
    targetID = event.target.closest("div").id;
    setPopPurchase(true);
  };

  const shutPurchaseHandler = (event) => {
    setPopPurchase(false);
  };

  const addToWishHandler = (event) => {
    const targetID = event.target.closest("div").id;
    const wishObj = data.find((el) => el.id === targetID);
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

  if (error) return <div>error</div>;

  return (
    <Fragment>
      {popPurchase && (
        <Purchase
          onShut={shutPurchaseHandler}
          ID={targetID}
          purchaseData={data}
        />
      )}
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes["product-container"]}>
        {status === "completed" &&
          data.length !== 0 &&
          data.map((cur, index, arr) => {
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
          })}
      </div>
    </Fragment>
  );
};

export default Product;
