// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import favReducer from './slices/favSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:  cartReducer,
    favorites: favReducer,
  },
});

export default store;
