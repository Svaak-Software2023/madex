import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"
import { toast } from "react-toastify"

export const getlikes = createAsyncThunk("get/like", async ( videoId) => {
    try {
        const response = await api.getlikes(videoId)
        // toast.success(response.data.message)
        // console.log("videoId",response.data);
        return response.data
    } catch (error) {
        // toast.error(error.response.data.statusCode.message)
        throw error.response.data.statusCode
    }
})

export const createLike = createAsyncThunk("create/like", async ({ userId, videoId, accessToken }) => {
    try {
        const response = await api.createLike({ userId, videoId, accessToken })
        // toast.success(response.data.message)
        getlikes(videoId)
        return response.data
    } catch (error) {
        toast.error(error.response.data.statusCode.message)
        throw error.response.data.statusCode
    }
})

export const createDisLike = createAsyncThunk("create/dislike", async ({ userId, videoId, accessToken }) => {
    try {
        const response = await api.createDisLike({ userId, videoId, accessToken })
        // toast.success(response.data.message)
        return response.data
    } catch (error) {
        toast.error(error.response.data.statusCode.message)
        throw error.response.data.statusCode
    }
})


const likeDislikeSlice = createSlice({
    name: "likeDislike",
    initialState: {
        like: 0,
        dislike: null,
        message: "",
        error: null,
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getlikes.pending, (state, action) => {
                state.dislike = null
                state.message = ""
                state.error = null
                state.loading = true
            })
            .addCase(getlikes.fulfilled, (state, action) => {
                state.like = action.payload?.data[0]?.likes
                state.dislike = null
                state.message = action.payload
                state.error = null
                state.loading = false
            })
            .addCase(getlikes.rejected, (state, action) => {
                state.dislike = null
                state.message = ""
                state.error = action.error
                state.loading = false
            })
            .addCase(createLike.pending, (state, action) => {
                state.dislike = null
                state.message = ""
                state.error = null
                state.loading = true
            })
            .addCase(createLike.fulfilled, (state, action) => {
                state.dislike = null
                state.message = action.payload.message
                state.error = null
                state.loading = false
            })
            .addCase(createLike.rejected, (state, action) => {
                state.dislike = null
                state.message = ""
                state.error = action.error
                state.loading = false
            })
            .addCase(createDisLike.pending, (state, action) => {
                state.dislike = null
                state.message = ""
                state.error = null
                state.loading = true
            })
            .addCase(createDisLike.fulfilled, (state, action) => {
                state.dislike = null
                state.message = action.payload.message
                state.error = null
                state.loading = false
            })
            .addCase(createDisLike.rejected, (state, action) => {
                state.dislike = null
                state.message = ""
                state.error = action.error
                state.loading = false
            })
    }
})


export default likeDislikeSlice.reducer