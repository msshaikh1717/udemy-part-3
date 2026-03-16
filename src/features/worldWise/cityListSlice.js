import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../WorldWise/lib/supabaseClient";

// Old code which uses json server
// const BASE_URL = "http://localhost:9000";

export const fetchCities = createAsyncThunk(
  "cityList/fetchCities",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("world_wise_cities")
      .select("*");

    if (error) return rejectWithValue(error.message);
    return data;
  },
);

export const createCity = createAsyncThunk(
  "cityList/createCity",
  async (newCity, { rejectWithValue }) => {
    // Get the current user (async)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return rejectWithValue(userError?.message || "Not authenticated");
    }
    // 2. Prepare the city object with user_id
    const cityToInsert = {
      ...newCity,
      user_id: user.id,
    };

    // 3. Insert into Supabase
    const { data, error } = await supabase
      .from("world_wise_cities")
      .insert([cityToInsert])
      .select(); // returns the inserted row

    if (error) return rejectWithValue(error.message);

    // 4. Return the created city (first element of data)

    return data[0];
  },
);

export const removeCity = createAsyncThunk(
  "cityList/removeCity",
  async (cityId, { rejectWithValue }) => {
    // 1. Delete from Supabase
    const { error } = await supabase
      .from("world_wise_cities")
      .delete()
      .eq("id", cityId);

    if (error) return rejectWithValue(error.message);

    // 2. Return the deleted city's id
    return cityId;
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
        state.cities = action.payload; //cities array
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to fetch cities";
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
        state.isError = action.error.message || "Failed to create city";
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
        state.isError = action.payload || "Failed to remove city";
      });
  },
});

export const selectCities = (state) => state.cityList.cities;
export const selectCitiesLoading = (state) => state.cityList.isLoading;
export const selectCitiesError = (state) => state.cityList.isError;

// export const { addCity, removeCity } = cityListSlice.actions; //local state update replaced with remote
export default cityListSlice.reducer;
