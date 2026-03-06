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
  isError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // update local state with user and token
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearSession: (state) => {
      ((state.user = null),
        (state.token = null),
        (state.isLoading = false),
        (state.isError = null));
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload; // rejectWithValue sets payload
      });
  },
});

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.isError;
export const selectIsAuthenticated = (state) => !!state.auth.token;

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
