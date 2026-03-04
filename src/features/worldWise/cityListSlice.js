import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:9000";

export const fetchCities = createAsyncThunk(
  "cityList/fetchCities",
  async () => {
    const response = await fetch(`${BASE_URL}/cities`);
    const data = await response.json();
    return data;
  },
);

export const createCity = createAsyncThunk(
  "cityList/createCity",
  async (newCity) => {
    const response = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCity),
    });
    const data = await response.json();
    return data; // // the server's response will include server‑generated id so no nanoid needed
  },
);

export const removeCity = createAsyncThunk(
  "cityList/removeCity",
  async (cityId) => {
    await fetch(`${BASE_URL}/cities/${cityId}`, {
      method: "DELETE",
    });
    return cityId; // return the id so we can remove it from state
  },
);

const initialState = {
  cities: [],
  isLoading: false,
  isError: null,
};

export const cityListSlice = createSlice({
  name: "cityList",
  initialState,
  // this is only good for local state and wont update remote state that is if you want to persist after hard reload
  // reducers: {
  //   addCity: (state, action) => {
  //     state.cities.push(action.payload);
  //   },
  //   removeCity: (state, action) => {
  //     state.cities = state.cities.filter(
  //       (cityItem) => cityItem.id !== action.payload,
  //     );
  //   },
  // },
  extraReducers: (builder) => {
    builder
      // Handle fetchCities cases
      .addCase(fetchCities.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Handle createCity cases
      .addCase(createCity.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities.push(action.payload);
      })
      .addCase(createCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      })
      // Handle removeCity cases
      .addCase(removeCity.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(removeCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = state.cities.filter(
          (city) => city.id !== action.payload,
        );
      })
      .addCase(removeCity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      });
  },
});

export const selectCities = (state) => state.cityList.cities;
export const selectCitiesLoading = (state) => state.cityList.isLoading;
export const selectCitiesError = (state) => state.cityList.isError;

// export const { addCity, removeCity } = cityListSlice.actions; //local state update replaced with remote
export default cityListSlice.reducer;
