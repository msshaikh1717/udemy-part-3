import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://dummyjson.com/auth/login";

export const loginUser = createAsyncThunk(
  "authSlice/loginUser",
  async function ({ email, password }) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ email, password }),
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }
    const data = await response.json();
    console.log(data, "<== data from api");
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
  name: "authSlice",
  initialState,

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
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const selectUser = (state) => state.authSlice.user;
export const selectUserLoading = (state) => state.authSlice.isLoading;
export const selectUserError = (state) => state.authSlice.isError;
export default authSlice.reducer;
