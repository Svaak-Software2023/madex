import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "sonner";

export const getAllWatchLater = createAsyncThunk(
  "get/watchLater",
  async (accessToken) => {
    try {
      const response = await api.getAllWatchLater(accessToken);
      return response.data;
    } catch (error) {
      throw error.response;
    }
  }
);

export const createWatchLater = createAsyncThunk(
  "create/watchLater",
  async ({ videoId, accessToken }) => {
    try {
      const response = await api.createWatchLater({ videoId, accessToken });
      toast.info("Video Added to Continue Later");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.statusCode.message);
      throw error.response;
    }
  }
);

export const deleteWatchLater = createAsyncThunk(
  "delete/watchLater",
  async ({ videoId, accessToken }) => {
    try {
      const response = await api.deleteWatchLater({ accessToken, videoId });
      toast.success("Video Removed Successfully");
      return response.data;
    } catch (error) {
      toast.error("Somthing went wrong");
      throw error.response.data;
    }
  }
);

export const deleteAllWatchLater = createAsyncThunk(
  "deleteAll/watchLater",
  async ({ userId, toast, accessToken }) => {
    try {
      const response = await api.deleteAllWatchLater({ accessToken, userId });
      toast.success("All Video Removed");
      return response.data;
    } catch (error) {
      toast.error("Somthing went wrong");

      throw error.response.data;
    }
  }
);

const watchLater = createSlice({
  name: "Watch Later",
  initialState: {
    videoData: [],
    message: "",
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllWatchLater.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = "");
      })
      .addCase(getAllWatchLater.fulfilled, (state, action) => {
        (state.loading = false), (state.videoData = action.payload.data);
        (state.message = action.payload.message), (state.error = "");
      })
      .addCase(getAllWatchLater.rejected, (state, action) => {
        (state.loading = false),
          (state.message = ""),
          (state.error = action.error);
        state.videoData = [];
      })
      .addCase(createWatchLater.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = "");
      })
      .addCase(createWatchLater.fulfilled, (state, action) => {
        (state.loading = false),
          (state.message = action.payload),
          (state.error = "");
      })
      .addCase(createWatchLater.rejected, (state, action) => {
        (state.loading = false),
          (state.message = ""),
          (state.error = action.error);
      })
      .addCase(deleteWatchLater.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = "");
      })
      .addCase(deleteWatchLater.fulfilled, (state, action) => {
        (state.loading = false),
          (state.message = action.payload),
          (state.error = "");
      })
      .addCase(deleteWatchLater.rejected, (state, action) => {
        (state.loading = false),
          (state.message = ""),
          (state.error = action.error);
      })
      .addCase(deleteAllWatchLater.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = "");
      })
      .addCase(deleteAllWatchLater.fulfilled, (state, action) => {
        (state.loading = false),
          (state.message = action.payload),
          (state.error = "");
      })
      .addCase(deleteAllWatchLater.rejected, (state, action) => {
        (state.loading = false),
          (state.message = ""),
          (state.error = action.error);
      });
  },
});

export default watchLater.reducer;
