import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPLaylist = createAsyncThunk(
  "create/playlist",
  async ({ videoId, accessToken, formData }) => {
    try {
      const response = await api.createPaylist({
        videoId,
        accessToken,
        formData,
      });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }
);

export const getPlaylistData = createAsyncThunk(
  "get/playlist",
  async ({ userId }) => {
    try {
      const response = await api.getPlaylist({ userId });
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }
);

export const addVideoToPLaylist = createAsyncThunk(
  "addVideo/playlist",
  async ({ playlistId, videoId, accessToken }) => {
    try {
      const response = await api.addVideoPLaylist({
        playlistId,
        videoId,
        accessToken,
      });
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error.response);
      throw error.response;
    }
  }
);

const playlist = createSlice({
  name: "playlist",
  initialState: {
    playlistData: [],
    message: "",
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPLaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPLaylist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPLaylist.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error),
          (state.message = action.payload?.statusCode.message);
      })
      .addCase(getPlaylistData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlaylistData.fulfilled, (state, action) => {
        (state.loading = false), (state.playlistData = action.payload.data);
      })
      .addCase(getPlaylistData.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error),
          (state.message = action.payload?.statusCode.message);
      })
      .addCase(addVideoToPLaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVideoToPLaylist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addVideoToPLaylist.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error),
          (state.message = action.payload?.statusCode.message);
      });
  },
});

export default playlist.reducer;
