import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  imageLink: "",
};

export const postAudit = createAsyncThunk(
  "restro/audit",
  async (audit, thunkAPI) => {
    try {
      const res = await axios.post("/audit/report", audit);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "audit/imageUpload",
  async (form, thunkAPI) => {
    try {
      const res = await axios.post("/audit/image", form);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    clearImage: (state) => initialState,
  },
  extraReducers: {
    [postAudit.pending]: (state) => {
      state.loading = true;
    },
    [postAudit.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload.msg);
    },
    [postAudit.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
    [uploadImage.pending]: (state) => {
      state.loading = true;
    },
    [uploadImage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.imageLink = payload.image;
    },
    [uploadImage.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
  },
});

export const { clearImage } = auditSlice.actions;
export default auditSlice.reducer;
