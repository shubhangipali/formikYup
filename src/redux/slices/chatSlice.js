// chatSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    fetchChatsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchChatsSuccess(state, action) {
      state.loading = false;
      state.chats = action.payload;
    },
    fetchChatsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action) {
      state.chats.push(action.payload);
    },
  },
});

export const { fetchChatsStart, fetchChatsSuccess, fetchChatsFailure, addMessage } = chatSlice.actions;

export default chatSlice.reducer;
