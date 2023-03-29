import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compareData: [],
};

export const compareSlice = createSlice({
  name: "compare",
  initialState: initialState,
  reducers: {
    addToCompare: (state, action) => {
      const itemInCart = state.compareData.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.compareData.push({ ...action.payload, quantity: 1 });
      }
    },
    removetoCompare: (state, action) => {
      const removetoCompare = state.compareData.filter(
        (item) => item.id !== action.payload
      );
      state.compareData = removetoCompare;
    },
  },
});
export const { addToCompare, removetoCompare } = compareSlice.actions;
export const compareLength = (state) => state.compare.compareData.length;
export const compareList = (state) => state.compare.compareData;
export default compareSlice.reducer;
