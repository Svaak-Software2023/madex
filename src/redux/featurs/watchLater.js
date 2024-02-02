import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"


const token = JSON.parse(localStorage.getItem('accessToken'))
const accessToken = token && token.accessToken

export const getAllWatchLater = createAsyncThunk("get/watchLater", async () => {
    try {
        const response = await api.getAllWatchLater(accessToken)
        return response.data
    } catch (error) {
        throw error.response
    }
})

export const createWatchLater = createAsyncThunk("create/watchLater", async ({ videoId, toast }) => {
    try {
        const response = await api.createWatchLater({ videoId, accessToken })
        toast.success(response.data.message)
        return response.data
    } catch (error) {
        toast.error(error.response.data.statusCode.message)
        console.log("error",error);
        throw error.response
    }
})

export const deleteWatchLater = createAsyncThunk("delete/watchLater", async ({ videoId, toast }) => {
    try {
        const response = await api.deleteWatchLater({ accessToken, videoId })
        toast.success(response.data.message)
        return response.data
    } catch (error) {
        console.log(error);
        throw error.response.data
    }
})

export const deleteAllWatchLater = createAsyncThunk("deleteAll/watchLater", async ({ userId, toast }) => {
    try {
        const response = await api.deleteAllWatchLater({ accessToken, userId })
        toast.success(response.data.message)
        return response.data
    } catch (error) {
        console.log(error);
        throw error.response.data
    }
})

const watchLater = createSlice({
    name: "Watch Later",
    initialState: {
        videoData: [],
        message: "",
        error: "",
        loading: false
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllWatchLater.pending, (state, action) => {
                state.loading = true,
                    state.message = "",
                    state.error = ""
            })
            .addCase(getAllWatchLater.fulfilled, (state, action) => {
                state.loading = false,
                    state.videoData = action.payload.data
                state.message = action.payload.message,
                    state.error = ""
            })
            .addCase(getAllWatchLater.rejected, (state, action) => {
                state.loading = false,
                    state.message = "",
                    state.error = action.error
                state.videoData = []
            })
            .addCase(createWatchLater.pending, (state, action) => {
                state.loading = true,
                    state.message = "",
                    state.error = ""
            })
            .addCase(createWatchLater.fulfilled, (state, action) => {
                state.loading = false,
                    state.message = action.payload,
                    state.error = ""
            })
            .addCase(createWatchLater.rejected, (state, action) => {
                state.loading = false,
                    state.message = "",
                    state.error = action.error
            })
            .addCase(deleteWatchLater.pending, (state, action) => {
                state.loading = true,
                    state.message = "",
                    state.error = ""
            })
            .addCase(deleteWatchLater.fulfilled, (state, action) => {
                state.loading = false,
                    state.message = action.payload,
                    state.error = ""
            })
            .addCase(deleteWatchLater.rejected, (state, action) => {
                state.loading = false,
                    state.message = "",
                    state.error = action.error
            })
            .addCase(deleteAllWatchLater.pending, (state, action) => {
                state.loading = true,
                    state.message = "",
                    state.error = ""
            })
            .addCase(deleteAllWatchLater.fulfilled, (state, action) => {
                state.loading = false,
                    state.message = action.payload,
                    state.error = ""
            })
            .addCase(deleteAllWatchLater.rejected, (state, action) => {
                state.loading = false,
                    state.message = "",
                    state.error = action.error
            })
    }
})

export default watchLater.reducer