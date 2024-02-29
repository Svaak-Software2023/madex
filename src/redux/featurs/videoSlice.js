import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllVideo = createAsyncThunk(
  "video/getAll",
  async (pageValue) => {
    try {
      const response = await api.getAllVideo(pageValue);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getSingleVideo = createAsyncThunk(
  "video/getSingle",
  async (videoId) => {
    try {
      const response = await api.getSingleVideo(videoId);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const viewCount = createAsyncThunk(
  "video/view-count",
  async (videoId) => {
    try {
      const response = await api.viewCount(videoId);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const videoUpload = createAsyncThunk(
  "video/upload",
  async ({ formData, setPercentage, accessToken }) => {
    try {
      const response = await api.videoUpload({
        formData,
        setPercentage,
        accessToken,
      });
      // navigate("/your-channel")
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getAllChanelVideo = createAsyncThunk(
  "channel/video",
  async (chanelId) => {
    try {
      const response = await api.getAllChanelVideo(chanelId);
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getAllCategoryVideo = createAsyncThunk(
  "category/video",
  async (categoryId) => {
    try {
      const response = await api.getAllCategoryVideo(categoryId);
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoData: null,
    channelVideoData: null,
    categoryVideoData: null,
    singleVideo: null,
    message: "",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all video get
      .addCase(getAllVideo.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(getAllVideo.fulfilled, (state, action) => {
        (state.loading = false), (state.videoData = action.payload.data.videos);
        (state.message = action.payload.message), (state.error = null);
      })
      .addCase(getAllVideo.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      })
      // single video get
      .addCase(getSingleVideo.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(getSingleVideo.fulfilled, (state, action) => {
        (state.loading = false), (state.singleVideo = action.payload.data);
        (state.message = action.payload.message), (state.error = null);
      })
      .addCase(getSingleVideo.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      })
      // view count

      .addCase(viewCount.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(viewCount.fulfilled, (state, action) => {
        (state.message = action.payload.message), (state.error = null);
      })
      .addCase(viewCount.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      })

      // upload video
      .addCase(videoUpload.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(videoUpload.fulfilled, (state, action) => {
        (state.loading = false),
          (state.message = action.payload.message),
          (state.error = null);
      })
      .addCase(videoUpload.rejected, (state, action) => {
        (state.loading = false), (state.message = "");
        state.error = action.error;
      })

      // channel video
      .addCase(getAllChanelVideo.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(getAllChanelVideo.fulfilled, (state, action) => {
        (state.loading = false), (state.channelVideoData = action.payload.data);
        (state.message = action.payload.message), (state.error = null);
      })
      .addCase(getAllChanelVideo.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      })

      // category video
      .addCase(getAllCategoryVideo.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(getAllCategoryVideo.fulfilled, (state, action) => {
        (state.loading = false),
          (state.categoryVideoData = action.payload.data);
        (state.message = action.payload.message), (state.error = null);
      })
      .addCase(getAllCategoryVideo.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      });
  },
});

export default videoSlice.reducer;
