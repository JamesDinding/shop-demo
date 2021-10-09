import { useState, useRef, useEffect, Fragment, useContext } from "react";
import useHttp from "../../hooks/use-http";
import { uploadProduct } from "../../lib/api";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./UploadProduct.module.css";

const UploadProduct = () => {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef();
  const priceRef = useRef();
  const urlRef = useRef();
  const numRef = useRef();
  const [responseStatus, setResponseStatus] = useState(false);

  let responseTimer = null;
  let information = "";
  let informationCss = "";

  const { sendRequest, error, status } = useHttp(uploadProduct, false);

  const [uploadNow, setUploadNow] = useState(false);

  const product_name = nameRef.current.value;
  const product_price = priceRef.current.value;
  const product_url = urlRef.current.value;
  const remaining_num = numRef.current.value;

  useEffect(() => {
    if (uploadNow) {
      sendRequest({
        product_name,
        product_price,
        product_url,
        remaining_num,
        product_seller: {
          seller_name: "none",
          seller_account: authCtx.email,
        },
      });
      nameRef.current.value = "";
      setUploadNow(false);
      setResponseStatus(true);
    }
  }, [
    uploadNow,
    sendRequest,
    setUploadNow,
    setResponseStatus,
    product_name,
    product_price,
    product_url,
    remaining_num,
  ]);

  const submitHandler = (event) => {
    event.preventDefault();

    setUploadNow(true);
  };

  if (responseStatus) {
    if (error) {
      information = "🚫 Upload Failed !!!";
      informationCss = "failure";
    } else {
      information = "✔ Upload Successed !!!";
      informationCss = "success";
    }

    clearTimeout(responseTimer);
    responseTimer = setTimeout(() => {
      setResponseStatus(false);
    }, 3000);
  }

  return (
    <Fragment>
      <Card>
        {responseStatus && (
          <span className={informationCss}>{information}</span>
        )}
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <h1>Upload Product</h1>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Product Name</label>
            <input
              ref={nameRef}
              type="text"
              id="name"
              placeholder="Enter name here"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="price">Product Price</label>
            <input
              ref={priceRef}
              type="number"
              id="price"
              min="1"
              defaultValue="1"
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="url">Picture Url</label>
            <input
              ref={urlRef}
              type="text"
              id="url"
              placeholder="Enter the legal url of img"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="num">Remaining num</label>
            <input
              ref={numRef}
              type="number"
              id="num"
              min="1"
              max="9"
              defaultValue="1"
            />
          </div>
          <div className={classes.actions}>
            <button className="btn">Upload</button>
          </div>
          {status === "pending" && <LoadingSpinner />}
        </form>
      </Card>
    </Fragment>
  );
};

export default UploadProduct;
