import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getLikedVideos = createAsyncThunk(
  "get/likedVideo",
  async ({ userId, accessToken }) => {
    try {
      const response = await api.getLikedVideos({ userId, accessToken });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }
);

const likedVideos = createSlice({
  name: "likedVideo",
  initialState: {
    likedVideoData: null,
    message: "",
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideoData = action.payload.data;
      })
      .addCase(getLikedVideos.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error);
      });
  },
});

export default likedVideos.reducer;
