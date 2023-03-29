import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartData.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartData.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cartData.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cartData.filter(
        (item) => item.id !== action.payload
      );
      state.cartData = removeItem;
    },
  },
});
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export const cartLength = (state) => state.cart.cartData.length;
export const cartList = (state) => state.cart.cartData;
export default cartSlice.reducer;
