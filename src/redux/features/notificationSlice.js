import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getNotifications = createAsyncThunk("getNotifications", async (formData) => {
    try {
        const res = await api.getNotification(formData);
        return res;
    }
    catch (error) {
        console.log("error", error);
        throw error.response;
    }
})

export const updateNotification = createAsyncThunk("updateNotification", async (accessToken) => {
    try {
        const res = await api.updateNotification(accessToken);
        console.log("success", res)
        return res;
    }
    catch (error) {
        console.log("error", error);
        throw error.response;
    }
})

export const deleteNotification = createAsyncThunk("deleteNotification", async (formData) => {
    try {
        const res = await api.deleteNotification(formData)
        // console.log("success", res)
        return res;
    }
    catch (error) {
        // console.log("error", error);
        throw error.response;
    }
})

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notification: [],
        countNotification: "",
        loading: false,
        error: "",
        message: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.message = "";
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notification = action.payload.data?.notifications;
                state.countNotification = action.payload.data?.countNotification
                state.loading = false;
                state.error = "";
                state.message = action.payload?.message;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.error = action.error.message; // Access error message
                state.loading = false;
                state.message = "";
            })
            .addCase(updateNotification.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.message = "";
            })
            .addCase(updateNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.message = action.payload?.message;
            })
            .addCase(updateNotification.rejected, (state, action) => {
                state.error = action.error.message; // Access error message
                state.loading = false;
                state.message = "";
            })
            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.message = "";
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.message = action.payload
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.error = action.error.message; // Access error message
                state.loading = false;
                state.message = "";
            })
            ;
    }
});

export default notificationSlice.reducer;
