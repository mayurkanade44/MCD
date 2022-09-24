import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
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

const auditSlice = createSlice({
  name: "audit",
  initialState,
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
  },
});

export default auditSlice.reducer;
