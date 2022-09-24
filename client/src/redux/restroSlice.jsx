import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  singleRestro: {},
};

export const restroRegistration = createAsyncThunk(
  "restro/registration",
  async (restro, thunkAPI) => {
    try {
      const res = await axios.post("/restaurant/restroDetails", restro);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getRestroDetails = createAsyncThunk(
  "restro/details",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/restaurant/restroDetails/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const restroSlice = createSlice({
  name: "restaurant",
  initialState,
  extraReducers: {
    [restroRegistration.pending]: (state) => {
      state.loading = true;
    },
    [restroRegistration.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload.msg);
    },
    [restroRegistration.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
    [getRestroDetails.pending]: (state) => {
      state.loading = true;
    },
    [getRestroDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.singleRestro = payload.restro;
    },
    [getRestroDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
  },
});

export default restroSlice.reducer;
