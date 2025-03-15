import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./Store/store-cart";
import mealReducer from "./Store/store-meals";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    meal: mealReducer,
  },
});

export default store;
