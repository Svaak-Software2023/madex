import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-toastify";

export const getAllComments = createAsyncThunk(
  "get/comment",
  async ({ videoId }) => {
    try {
      const response = await api.getAllComments({ videoId });
      return response.data;
    } catch (error) {
      throw error.response?.message;
    }
  }
);

export const createComment = createAsyncThunk(
  "create/comment",
  async ({ content, videoId, userId, accessToken }) => {
    try {
      const createResponse = await api.createComment({
        content,
        videoId,
        userId,
        accessToken,
      });

      const response = await api.getAllComments({ videoId });

      return response.data;
    } catch (error) {
      throw error.response.data.statusCode;
    }
  }
);
export const updateComment = createAsyncThunk(
  "update/comment",
  async ({ commentId, accessToken, content }) => {
    try {
      const response = await api.updateComment({
        commentId,
        accessToken,
        content,
      });
      toast.success("Updated Successfully", { autoClose: 700 });

      return response.data;
    } catch (error) {
      throw error.response.data.statusCode;
    }
  }
);
export const deleteComment = createAsyncThunk(
  "delete/comment",
  async ({ commentId, accessToken }) => {
    try {
      const response = await api.deleteComment({
        commentId,
        accessToken,
      });
      toast.success("Delete Successfully", { autoClose: 700 });

      return response.data;
    } catch (error) {
      throw error.response.data.statusCode;
    }
  }
);

const comment = createSlice({
  name: "comment",
  initialState: {
    commentData: null,
    message: "",
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.commentData = action.payload.data;
        state.message = action.payload.data;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentData = action.payload.data;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.commentData = action.payload.data;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default comment.reducer;
