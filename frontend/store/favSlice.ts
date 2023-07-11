import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavState {
  favItems: ProductCard[];
}

const initialState: FavState = {
  favItems: [],
};

export const favSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<ProductCard>) => {
      state.favItems.push(action.payload);
    },
    removeFavItem: (state, action: PayloadAction<string>) => {
      state.favItems = state.favItems.filter(
        (item) => item.slug !== action.payload
      );
    },
  },
});

export const { addToFav, removeFavItem } = favSlice.actions;
export default favSlice.reducer;
