import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtDecode from 'jwt-decode';
 // Corrected import statement
//  import jwtDecode from 'jwt-decode'; // Correct ES module import
// import { decode as jwtDecode } from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

// const token = "eyJ0eXAiO.../// jwt token";
// const decoded = jwtDecode(token);

const getSessionFromStorage = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return {
      user: decodedToken.username,
      token,
      decodedToken,
      isAuthenticated: true,
    };
  }
  return {
    user: null,
    token: null,
    decodedToken: null,
    isAuthenticated: false,
  };
};

const initialState = getSessionFromStorage();

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', credentials, { withCredentials: true });
    const { username, token } = response.data;
    const decodedToken = jwtDecode(token);
    sessionStorage.setItem('token', token);
    return { username, token, decodedToken };
  } catch (error) {
    console.error('Login error:', error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    sessionStorage.removeItem('token');
    return { user: null, token: null, decodedToken: null, isAuthenticated: false };
  } catch (error) {
    console.error('Logout error:', error);
    throw error; // Ensure errors are thrown to be handled by the rejected case
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    ...initialState,
    loginInProgress: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginInProgress = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { username, token, decodedToken } = action.payload || {};
        state.user = username || null;
        state.token = token || null;
        state.decodedToken = decodedToken || null;
        state.isAuthenticated = !!token;
        state.error = null;
        state.loginInProgress = false;
        console.log('Login action fulfilled:', state);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        state.token = null;
        state.decodedToken = null;
        state.isAuthenticated = false;
        state.loginInProgress = false;
        console.error('Login action rejected:', action.payload);
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.decodedToken = action.payload.decodedToken;
        state.isAuthenticated = action.payload.isAuthenticated;
        console.log('Logout action fulfilled:', state);
      });
  },
});

export default authSlice.reducer;
