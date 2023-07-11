import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import favSlice from "./favSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorite: favSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
