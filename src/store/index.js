import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import wishSlice from "./wish-slice";

const store = configureStore({
  reducer: {
    wish: wishSlice,
    ui: uiSlice,
  },
});

export default store;
