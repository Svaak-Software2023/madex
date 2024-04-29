import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "sonner";

// get complaint categories list
export const getComplaintCategoriesList = createAsyncThunk(
  "get/complaint-categories-list",
  async () => {
    try {
      const response = await api.getAllComplaintCategoryList();
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const createNewComplaint = createAsyncThunk(
  "post/create-complaint",
  async ({ formData, accessToken }) => {
    try {
      const response = await api.createComplaint(formData, accessToken);
      if (response.data) {
        toast.info("Complaint submitted", { duration: 1000 });
      }
      return response.data;
    } catch (error) {
      toast.error("Please Login for complaint ", { duration: 1000 });

      throw error.response.data;
    }
  }
);

export const getAllComplaintByUserID = createAsyncThunk(
  "get/allComplaintByUserID",
  async ({ accessToken }) => {
    try {
      const response = await api.getAllComplaintByUserId(accessToken);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintCategoryList: null,
    complaintResponse: null,
    AllComplaintListByUserId: null,
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getComplaintCategoriesList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getComplaintCategoriesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaintCategoryList = action.payload.data;
        state.error = "";
      })
      .addCase(getComplaintCategoriesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(createNewComplaint.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaintResponse = action.payload.data;
        state.error = "";
      })
      .addCase(createNewComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getAllComplaintByUserID.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllComplaintByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllComplaintListByUserId = action.payload.data;
      })
      .addCase(getAllComplaintByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default complaintSlice.reducer;
