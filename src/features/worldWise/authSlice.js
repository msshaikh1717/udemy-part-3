// authSlice – The Redux Auth State Manager: This slice is the single source of truth for authentication data in your app.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../WorldWise/lib/supabaseClient";

export const loginUser = createAsyncThunk(
  "authSlice/loginUser",
  async function ({ email, password }, { rejectWithValue }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }
    // data contains: { user, session }
    return data;
  },
);

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isInitialized: false, // When the app first loads, we need to check if the user is already logged in (via localStorage). While that check runs, we shouldn't render anything that depends on auth state. isInitialized becomes true only after that first check completes – regardless of outcome. Until then, ProtectedRoute shows a spinner.
  isError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // update local state with user and token, mark initialized
    setSession: (state, action) => {
      // sets user/token and marks isInitialized = true. Called when we already have a session (from initial check or sign-in)
      state.isInitialized = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearSession: (state) => {
      // logs out (resets state) but keeps isInitialized = true
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.isError = null;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      // just marks isInitialized = true without setting user/token – used when initial check finds no session.
      state.isInitialized = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.user = action.payload.user;
        state.token = action.payload.session.access_token;

        // isInitialized should already be true, but if not, we could set it (unlikely, but safe)
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload; // rejectWithValue sets payload
        // initialization is still considered done (attempt failed)
        state.isInitialized = true;
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.isError;
export const selectIsAuthenticated = (state) => !!state.auth.token;
export const selectIsInitialized = (state) => state.auth.isInitialized;

export const { setSession, clearSession, setInitialized } = authSlice.actions;
export default authSlice.reducer;
