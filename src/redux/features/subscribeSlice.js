import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "sonner";

export const checkSubscribe = createAsyncThunk(
  "get/subscribe",
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

export const createSubscribe = createAsyncThunk(
  "create/subscribe",
  async ({ userId, username, channelId, accessToken }) => {
    try {
      const messageResponse = await api.subscribe({
        userId,
        channelId,
        accessToken,
      });

      const dataResponse = await api.getUserStationProfile({
        username,
        accessToken,
      });

      return {
        messageRes: messageResponse.data,
        dataRes: dataResponse.data,
      };
    } catch (error) {
      toast.error(error.response.data.statusCode.message);
      throw error;
    }
  }
);

export const unSubscribe = createAsyncThunk(
  "delete/subscribe",
  async ({ userId, username, channelId, accessToken }) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const messageResponse = await api.unSubscribe({
        userId,
        channelId,
        accessToken,
      });

      const dataResponse = await api.getUserStationProfile({
        username,
        accessToken,
      });

      return {
        messageRes: messageResponse.data,
        dataRes: dataResponse.data,
      };
    } catch (error) {
      throw error;
    }
  }
);
const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    checkIsSubscribed: null,
    message: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      // Subscribe a Channel
      .addCase(createSubscribe.pending, (state) => {
        state.message = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(createSubscribe.fulfilled, (state, action) => {
        state.checkIsSubscribed = action.payload.dataRes.data.isSubscribed;
        state.message = action.payload.messageRes.message;
        state.error = null;
        state.loading = false;
      })

      .addCase(createSubscribe.rejected, (state, action) => {
        state.message = action.payload.dataRes.statusCode.message;
        state.error = action.error;
        state.loading = false;
      })
      // Check IS Subscribed
      .addCase(checkSubscribe.pending, (state) => {
        state.message = null;
        state.loading = true;
      })
      .addCase(checkSubscribe.fulfilled, (state, action) => {
        state.checkIsSubscribed = action.payload.data.isSubscribed;
        state.message = action.payload.data.message;
        state.loading = false;
      })
      .addCase(checkSubscribe.rejected, (state, action) => {
        state.message = null;
        state.error = action.error.message;
        state.loading = false;
      })
      // Unscribe A Channel
      .addCase(unSubscribe.pending, (state) => {
        state.loading = true;
      })
      .addCase(unSubscribe.fulfilled, (state, action) => {
        state.checkIsSubscribed = action.payload.dataRes.data.isSubscribed;
        state.message = action.payload.messageRes.message;
        state.loading = false;
      })
      .addCase(unSubscribe.rejected, (state, action) => {
        state.message = null;
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default subscribeSlice.reducer;
