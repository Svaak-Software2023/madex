import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (formData) => {
    try {
      const response = await api.createNewChannel(formData);
      return response.data;
    } catch (error) {
      // Instead of throwing error.response, throw the entire error object
      throw error.response.data.statusCode;
    }
  }
);

export const getChannel = createAsyncThunk("channel/get", async (userId) => {
  try {
    const response = await api.getChannel(userId);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.statusCode);
    throw error.response.data.statusCode.statusCode;
  }
});

export const getAllChannelList = createAsyncThunk(
  "channel/getAllChannel",
  async ({ accessToken }) => {
    try {
      const response = await api.getAllChannelList({ accessToken });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getUserStationProfile = createAsyncThunk(
  "channel/getStationDetails",
  async ({ username, accessToken }) => {
    try {
      const response = await api.getUserStationProfile({
        username,
        accessToken,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    data: null,
    channelList: null,
    channelProfile: null,
    channelNotExit: null,
    loading: false,
    message: "",
    error: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createChannel.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = "";
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.message = "";
        state.error = action.error; // Use action.error.message or whatever property holds the error message
      })
      .addCase(getChannel.pending, (state) => {
        state.loading = false;
        state.message = "";
        state.error = "";
      })
      .addCase(getChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(getChannel.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.message = "";
        state.channelNotExit = action.error;
        state.error = action.error; // Use action.error.message or whatever property holds the error message
      })
      .addCase(getAllChannelList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllChannelList.fulfilled, (state, action) => {
        state.loading = false;
        state.channelList = action.payload.data;
      })
      .addCase(getAllChannelList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getUserStationProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserStationProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.channelProfile = action.payload.data;
      })
      .addCase(getUserStationProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default channelSlice.reducer;
