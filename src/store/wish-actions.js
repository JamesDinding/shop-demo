import { wishActions } from "./wish-slice";
import { uiActions } from "./ui-slice";

export const fetchWishData = () => {
  return async (dispatch) => {
    const fecthData = async () => {
      const response = await fecth("url");

      if (!response.ok) throw new Error("Could not fecth wish data!");

      const data = await response.json();

      return data;
    };

    try {
      const wishData = await fecthData();
      dispatch(
        wishActions.replaceWish({
          items: wishData.items,
          totalQuantity: wishData.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.show({ status: "err", title: "error", message: "Failed" })
      );
      console.log("Failed to fecth wish data", err.message);
    }
  };
};

export const sendWish = (wish) => {
  return async (dispatch) => {
    dispatch(
      uiActions.show({
        status: "pending",
        title: "Sending...",
        message: "Sending wishlist data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("url", {
        method: "PUT",
        body: JSON.stringify({
          items: wish.items,
          totalQuantity: wish.totalQuantity,
        }),
      });

      if (!response.ok) throw new Error("Failed to send data!");
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.show({
          status: "success",
          title: "Success",
          message: "Successfully sending wishlist data!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.show({
          status: "error",
          title: "Error",
          message: "Failed to send wishlist data!",
        })
      );
    }
  };
};
