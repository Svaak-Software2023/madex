import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
// import { toast } from "react-toastify";
import { toast } from "sonner";

export const createPLaylist = createAsyncThunk(
  "create/playlist",
  async ({ videoId, accessToken, formData }) => {
    try {
      const response = await api.createPaylist({
        videoId,
        accessToken,
        formData,
      });
      toast.info("Video added Successfully", { duration: 1000 });

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
      // console.log(response);
      toast.info("Video added Successfully", { duration: 1000 });
      return response.data;
    } catch (error) {
      // console.log(error.response);
      throw error.response;
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "delete/playlist",
  async ({ playListId, accessToken }) => {
    try {
      const response = await api.deletePLaylist({ playListId, accessToken });
      toast.info("Playlist Delete Successfully", { duration: 1000 });
      return response.data;
    } catch (error) {
      toast.error("Something went wrong", { duration: 1000 });

      throw error.response;
    }
  }
);

export const updatePlaylist = createAsyncThunk(
  "update/playlist",
  async ({ playListId, formData, accessToken, userId }) => {
    try {
      const updatedResponse = await api.updatePLaylist({
        playListId,
        formData,
        accessToken,
      });
      toast.info("Update Successfully", { duration: 1000 });
      const response = await api.getPlaylist({ userId });
      return response.data;
    } catch (error) {
      toast.error("Something went wrong!", { duration: 1000 });

      throw error.response;
    }
  }
);

export const deletePlaylistVideo = createAsyncThunk(
  "delete/playlist/video",
  async ({ videoId, playListId, accessToken, userId }) => {
    try {
      const deleteresponse = await api.deletPLaylistVideo({
        videoId,
        playListId,
        accessToken,
      });
      const response = await api.getPlaylist({ userId });
      toast.success("Video Removed From Playlist", { duration: 1000 });
      return response.data;
    } catch (error) {
      toast.error("Something went wrong!", { duration: 1000 });
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
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlaylist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error),
          (state.message = action.payload?.statusCode.message);
      })
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistData = action.payload.data;
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.error),
          (state.message = action.payload?.statusCode.message);
      })
      .addCase(deletePlaylistVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlaylistVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.playlistData = action.payload.data;
      })
      .addCase(deletePlaylistVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default playlist.reducer;
