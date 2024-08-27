import { createSlice } from "@reduxjs/toolkit";
import { getCartItems, saveCartItems } from "../../utils/localStoarge";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // items: [],
    items:getCartItems(),
  },
  reducers: {
    addItems: (state, action) => {
      // mutating the state here
      state.items.push(action.payload);
      saveCartItems(state.items);
      console.log(state.items); // Corrected console.log statement
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      saveCartItems(state.items);
    },
    removeItem: (state) => {
      state.items.pop();
      saveCartItems(state.items);
    },
    clearCart: (state) => {
      state.items.length = 0;
      saveCartItems([]);
    },
  },
});

export const { addItems, removeItem, clearCart,setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
