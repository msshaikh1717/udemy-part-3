import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectQuery = (state) => state.query.searchQuery;
export const { setSearchQuery } = querySlice.actions;
export default querySlice.reducer;
