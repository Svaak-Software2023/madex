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
  
  
  export const getChannel = createAsyncThunk("channel/get",
  async (userId) => {
    try {
      const response = await api.getChannel(userId);
      return response.data;
    } catch (error) {
      console.log("this is the error",error);
      // Instead of throwing error.response, throw the entire error object
      throw error.response.data.statusCode;
    }
  }
)
const channelSlice = createSlice({
  name: "channel",
  initialState: {
    data: null,
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
        state.error = ""
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.error = ""
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.data = null
        state.message = "";
        state.error = action.error; // Use action.error.message or whatever property holds the error message
      })
      .addCase(getChannel.pending, (state) => {
        state.loading = false;
        state.message = "";
        state.error = ""
      })
      .addCase(getChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.error = ""
      })
      .addCase(getChannel.rejected, (state, action) => {
        state.loading = false;
        state.data = null
        state.message = "";
        state.error = action.error; // Use action.error.message or whatever property holds the error message
      })
      ;
  },
});

export default channelSlice.reducer;
