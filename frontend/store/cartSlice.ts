import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; selectedSize: string }>
    ) => {
      const item = {
        id: action.payload.product.id,
        attributes: {
          name: action.payload.product.attributes.name,
          subtitle: action.payload.product.attributes.subtitle,
          price: action.payload.product.attributes.price,
          slug: action.payload.product.attributes.slug,
          size: action.payload.product.attributes.size,
          thumbnail: action.payload.product.attributes.thumbnail,
        },
        selectedSize: action.payload.selectedSize,
        count: 1,
      };
      const findItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (findItem) {
        state.cartItems = state.cartItems.map((cartItem) => {
          if (cartItem.id !== findItem.id) return cartItem;

          console.log("CartItem id: " + cartItem.id, " NewItem id: " + item.id);

          if (cartItem.selectedSize !== action.payload.selectedSize)
            return item;

          state.totalPrice += item.attributes.price;

          return {
            ...item,
            count: cartItem.count + 1,
          };
        });
      } else {
        state.cartItems.push(item);
        state.totalPrice += item.attributes.price;
      }
    },
    updateItemSize: (
      state,
      action: PayloadAction<{ id: number; newSize: string }>
    ) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id !== action.payload.id) return cartItem;

        return {
          ...cartItem,
          selectedSize: action.payload.newSize,
        };
      });
    },
    updateItemCount: (
      state,
      action: PayloadAction<{ id: number; newCount: number }>
    ) => {
      const findItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id !== action.payload.id) return cartItem;

        return {
          ...cartItem,
          count: action.payload.newCount,
        };
      });

      if (findItem) {
        state.totalPrice -= findItem.attributes.price * findItem.count;
        state.totalPrice += findItem.attributes.price * action.payload.newCount;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const findItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      if (findItem)
        state.totalPrice -= findItem?.attributes.price * findItem?.count;
    },
  },
});

export const { addToCart, updateItemSize, updateItemCount, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
