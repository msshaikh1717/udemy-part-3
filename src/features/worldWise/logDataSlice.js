import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

export const logDataSlice = createSlice({
  name: "logData",
  initialState,
  reducers: {
    setLogData: (state, action) => {
      if (!action.payload) {
        state.email = "";
        state.password = "";
      } else {
        state.email = action.payload.email || "";
        state.password = action.payload.password || "";
      }
    },
  },
});

export const { setLogData } = logDataSlice.actions;
export default logDataSlice.reducer;
