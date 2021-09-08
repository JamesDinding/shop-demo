import { useContext, Fragment } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../../store/auth-context";
import BackDrop from "../UI/BackDrop";
import classes from "./Purchase.module.css";

const PurchaseModal = (props) => {
  const authCtx = useContext(AuthContext);
  const productData = props.purchaseData.find((el) => el.id === props.ID);

  const addWishHanlder = (event) => {
    authCtx.addWish(productData);
    props.onShut();
  };

  const subbmitHandler = (event) => {
    event.preventDefault();
    //之後應該是要進入購買頁面，向後端傳送訂單資訊，在依response顯示像對應的頁面給user
  };

  return (
    <form onSubmit={subbmitHandler} className={classes.purchase}>
      <span onClick={props.onShut()} className={classes.close}>
        Ｘ
      </span>
      <div>
        <h1 className={classes.title}>商品名稱：{productData.product_name}</h1>
      </div>
      <span className={classes.description}>
        價格： {productData.product_price}
      </span>
      <div className={classes.description}>
        <label htmlFor="num">購買數量：</label>
        <input
          className={classes.inputbox}
          id="num"
          type="number"
          defaultValue="1"
          min="1"
          max={productData.remaining_num}
        />
      </div>
      <div className={classes["btn-container"]}>
        <button className="btn" onClick={addWishHanlder}>
          add to wish
        </button>
        <button className="btn">購買(無後續)</button>
      </div>
    </form>
  );
};

const Purchase = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onShut={props.onShut} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <PurchaseModal
          onShut={props.onShut}
          ID={props.ID}
          purchaseData={props.purchaseData}
        />,
        document.getElementById("purchase-root")
      )}
    </Fragment>
  );
};

export default Purchase;
