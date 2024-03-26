import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

export const updateVideoDetail = createAsyncThunk(
  "update/video/detail",
  async ({ formData, videoId, accessToken, channelId }) => {
    try {
      const updatedResponse = await api.updateVideoDetails(
        formData,
        videoId,
        accessToken
      );
      const promise = () =>
        new Promise((resolve) => setTimeout(() => resolve(), 2000));

      if (updatedResponse.data) {
        // toast.info("Video has been updated successfully");
        toast.promise(promise, {
          loading: "Loading...",
          success: () => {
            return "Video has been updated successfully";
          },
          error: "Error",
        });
      }
      const dataResponse = await api.getAllChanelVideo(channelId);

      return {
        updatedResponse: updatedResponse.data,
        dataResponse: dataResponse.data,
      };
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const deleteVideo = createAsyncThunk(
  "delete/video",
  async ({ videoId, accessToken, channelId }) => {
    try {
      const deleteResponse = await api.deleteVideo({ videoId, accessToken });

      if (deleteResponse.data) {
        toast.success("Video has been deleted successfully");
      }
      const dataResponse = await api.getAllChanelVideo(channelId);

      return {
        deleteResponse: deleteResponse.data,
        dataResponse: dataResponse.data,
      };
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
      })
      // update Video data
      .addCase(updateVideoDetail.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(updateVideoDetail.fulfilled, (state, action) => {
        (state.loading = false),
          (state.channelVideoData = action.payload.dataResponse.data);
        (state.message = action.payload.updatedResponse.message),
          (state.error = null);
      })
      .addCase(updateVideoDetail.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      })
      // Delete Video
      .addCase(deleteVideo.pending, (state) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        (state.loading = false),
          (state.channelVideoData = action.payload.dataResponse.data);
        (state.message = action.payload.deleteResponse.message),
          (state.error = null);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      });
  },
});

export default videoSlice.reducer;
