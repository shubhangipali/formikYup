// src/redux/slices/favSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getFavItems, saveFavItems } from '../../utils/localStoarge';

const initialState = {
    items: getFavItems(),
};

const favSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.items.push(action.payload);
            saveFavItems(state.items);
        },
        removeFavorite: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            saveFavItems(state.items);
        },
        clearFavorites: (state) => {
            state.items = [];
            saveFavItems([]);
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favSlice.actions;

export default favSlice.reducer;
