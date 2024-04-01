import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getSearchedData = createAsyncThunk(
  "search/search video",
  async ({ searchTerm }) => {
    try {
      const response = await api.searchVideo(searchTerm);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const searchVideoSlice = createSlice({
  name: "search Video",
  initialState: {
    searchedData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchedData.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedData = action.payload.data;
      })
      .addCase(getSearchedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default searchVideoSlice.reducer;
