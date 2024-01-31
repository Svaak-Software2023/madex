import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllVideo = createAsyncThunk("video/getAll", async () => {
    try {
        const response = await api.getAllVideo()
        console.log("Video",response);
        return response.data
    } catch (error) {
        throw error.response.data
    }
})

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

export const videoUpload = createAsyncThunk(
  "video/upload",
  async ({ formData, setPercentage, navigate }) => {
    try {
      const response = await api.videoUpload({ formData, setPercentage });
      // navigate("/your-channel")
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getAllChanelVideo = createAsyncThunk("channel/video",async (chanelId)=>{
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
    singleVideo: null,
    message: "",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all video get
      .addCase(getAllVideo.pending, (state, action) => {
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
      .addCase(getSingleVideo.pending, (state, action) => {
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

      // upload video

      .addCase(videoUpload.pending, (state, action) => {
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
      .addCase(getAllChanelVideo.pending, (state, action) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(getAllChanelVideo.fulfilled, (state, action) => {
        (state.loading = false), (state.videoData = action.payload.data);
        (state.message = action.payload.message), (state.error = null);
      })
      .addCase(getAllChanelVideo.rejected, (state, action) => {
        (state.loading = false), (state.videoData = null);
        state.message = "";
        state.error = action.error;
      })

      // category video
      .addCase(getAllCategoryVideo.pending, (state, action) => {
        (state.loading = true), (state.message = ""), (state.error = null);
      })
      .addCase(getAllCategoryVideo.fulfilled, (state, action) => {
        console.log(action);
        (state.loading = false), (state.videoData = action.payload.data);
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
