import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: [23.0225, 72.5714], //initial value
  clickedCityObj: {},
  mapError: null,
};

export const currPositionSlice = createSlice({
  name: "currPosition",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.mapError = null;
      state.position = action.payload;
    },
    setClickedCityObj: (state, action) => {
      state.mapError = null;
      state.clickedCityObj = action.payload;
    },
    setMapError: (state, action) => {
      state.mapError = action.payload;
    },
  },
});

export const selectPosition = (state) => state.currPosition.position;
export const selectClickedCityObj = (state) =>
  state.currPosition.clickedCityObj;
export const selectMapError = (state) => state.currPosition.mapError;
export const { setPosition, setClickedCityObj, setMapError } =
  currPositionSlice.actions;
export default currPositionSlice.reducer;
