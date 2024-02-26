import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllHistory = createAsyncThunk(
  "video/getHistory",
  async (token) => {
    try {
      const response = await api.getHistory(token);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
);

export const createHistory = createAsyncThunk(
  "history/createHistory",
  async ({ videoId, accessToken }) => {
    try {
      const response = await api.createHistory({ videoId, accessToken });
      console.log("History:", response.data);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
);

export const deleteHistory = createAsyncThunk(
  "history/deleteHistory",
  async ({ token, id }) => {
    try {
      const delResponse = await api.deleteSingleHistory(token, id);
      const response = await api.getHistory(token);
      return response;
    } catch (error) {
      throw error.response;
    }
  }
);

export const deleteAllHistory = createAsyncThunk(
  "history/deleteAllHistory",
  async (token) => {
    try {
      console.log(token);
      const response = await api.deleteAllHistory(token);
      return response;
    } catch (error) {
      console.log(error);
      throw error.response;
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    message: "",
    historyData: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload.data.history;
        state.message = "History Get Successful";
      })
      .addCase(getAllHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(createHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload?.data.history;
        state.error = null;
      })
      .addCase(createHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload?.data.history;
        state.error = null;
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.loading = false;
        state.historyData = null;
        state.error = action.error;
      })
      .addCase(deleteAllHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllHistory.fulfilled, (state) => {
        state.loading = false;
        state.historyData = null;
        state.error = null;
      })
      .addCase(deleteAllHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default historySlice.reducer;
