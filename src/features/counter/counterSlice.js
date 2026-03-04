import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  step: 1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.value = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    increment: (state) => {
      state.value += state.step;
    },
    decrement: (state) => {
      state.value -= state.step;
    },
    reset: (state) => {
      state.value = 0;
      state.step = 1;
    },
  },
});

export function selectCalculatedDate(state) {
  const today = new Date();
  today.setDate(today.getDate() + state.counter.value);
  return today.toDateString();
}

export const { setCount, setStep, increment, decrement, reset } =
  counterSlice.actions;
export default counterSlice.reducer;
