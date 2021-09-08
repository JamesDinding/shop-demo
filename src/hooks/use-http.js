import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  switch (action.type) {
    case "SEND":
      return {
        data: null,
        error: null,
        status: "pending",
      };
    case "SUCCESS":
      return {
        data: action.responseData,
        error: null,
        status: "completed",
      };
    case "ERROR":
      return {
        data: null,
        error: action.errorMessage,
        status: "completed",
      };
    case "RESET":
      return {
        data: null,
        error: null,
        status: null,
      };
    default:
      return state;
  }
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const resetHelper = () => {
    dispatch({ type: "RESET" });
  };

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (err) {
        dispatch({
          type: "ERROR",
          errorMessage: err.message || "something wrong💩",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    resetHelper,
    ...httpState,
  };
}

export default useHttp;
