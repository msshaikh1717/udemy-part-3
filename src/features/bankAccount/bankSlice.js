import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  status: "close",
};

export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    openAccount: (state) => {
      state.balance = 500;
      state.loan = 0;
      state.status = "open";
    },
    deposit150: (state, action) => {
      state.balance += action.payload;
    },
    withdraw50: (state, action) => {
      state.balance -= action.payload;
    },
    reqLoan5000: (state, action) => {
      if (state.loan > 0) return;
      state.balance += action.payload;
      state.loan = action.payload;
    },
    payLoan: (state) => {
      if (state.loan < 1) return;

      state.balance -= state.loan;
      state.loan -= state.loan;
    },
    closeAccount: (state) => {
      if (state.loan !== 0 || state.balance !== 0) return;
      state.status = "close";
    },
  },
});

export const selectBalance = (state) => state.bank.balance;
export const selectLoan = (state) => state.bank.loan;
export const selectStatus = (state) => state.bank.status;

export const {
  openAccount,
  deposit150,
  withdraw50,
  reqLoan5000,
  payLoan,
  closeAccount,
} = bankSlice.actions;

export default bankSlice.reducer;
