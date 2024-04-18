import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "sonner";

export const sendFeedBack = createAsyncThunk(
  "post/feedback",
  async ({ feedBackDescription, accessToken }) => {
    try {
      const response = await api.sendFeedBack(feedBackDescription, accessToken);
      if (response.data) {
        toast.info("sent Successfully");
      }
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbackData: null,
    message: "",
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedBack.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(sendFeedBack.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackData = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(sendFeedBack.rejected, (state, action) => {
        state.loading = false;
        state.feedbackData = null;
        state.error = action.error;
      });
  },
});

export default feedbackSlice.reducer;
