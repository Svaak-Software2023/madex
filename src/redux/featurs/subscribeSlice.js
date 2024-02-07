import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"
import { toast } from "react-toastify";

export const checkSubscribe = createAsyncThunk("get/subscribe", async ({ userId, channelId, accessToken }) => {
    try {
        const response = await api.checkisSubscribe({ userId, channelId, accessToken })
        console.log("userId:",userId, "channelId:",channelId, "accessToken:",accessToken,"this is response", response);
        return response.data
    } catch (error) {
        console.log("userId:",userId, "channelId:",channelId, "accessToken:",accessToken,"error",error);
      toast.error(error.response.data.statusCode.message)
        throw error.response.data
    }
})

export const createSubscribe = createAsyncThunk("create/subscribe", async ({ userId, channelId, accessToken }) => {
    try {
        const response = await api.subscribe({ userId, channelId, accessToken })
        // console.log("response", response);
        return response.data
    } catch (error) {
      toast.error(error.response.data.statusCode.message)
        throw error
    }
})
const subscribeSlice = createSlice({
    name: "subscribe",
    initialState: {
        isSubscribed:null,
        message: null,
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubscribe.pending, (state, action) => {
                state.message = null
                state.error = null
                state.loading = true
            })
            .addCase(createSubscribe.fulfilled, (state, action) => {
                state.message = action.payload
                state.error = null
                state.loading = false
            })
            .addCase(createSubscribe.rejected, (state, action) => {
                state.message = null
                state.error = action.error
                state.loading = false
            })
            .addCase(checkSubscribe.pending, (state, action) => {
                state.message = null
                state.error = null
                state.loading = true
            })
            .addCase(checkSubscribe.fulfilled, (state, action) => {
                state.isSubscribed=action.payload.data.isSubscribed
                state.message = action.payload.data.message
                state.error = null
                state.loading = false
            })
            .addCase(checkSubscribe.rejected, (state, action) => {
                state.message = null
                state.error = action.error.message
                state.loading = false
            })
    }
})

export default subscribeSlice.reducer