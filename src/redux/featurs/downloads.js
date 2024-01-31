import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


const token=JSON.parse(localStorage.getItem('accessToken'))
const accessToken =token&&token.accessToken
export const getDownload = createAsyncThunk("get/download", async () => {
    try {
        const response = await api.getAllDownloads(accessToken)
        return response.data
    }
    catch (error) {
        throw error.data
    }
})

export const createDownload = createAsyncThunk("create/download", async (videoId) => {
    console.log(accessToken);
    try {
        const response = await api.createDownloads({videoId,accessToken})
        return response.data
    }
    catch (error) {
        console.log("this is the response",error.response.data.statusCode);
        alert(error.response.data.statusCode.message)
        throw error.response.data.statusCode
    }
})

const downloads = createSlice({
    name: "Download",
    initialState: {
        videoData: null,
        message: "",
        error: "",
        loading: false
    },

    extraReducers: (builder) => {
        builder
            .addCase(getDownload.pending, (state, action) => {
                state.error = "";
                state.message = "";
                state.loading = true;
            })
            .addCase(getDownload.fulfilled, (state, action) => {
                state.error = "";
                state.message = action.payload.message;
                state.loading = false;
                state.videoData = action.payload.data.download
            })
            .addCase(getDownload.rejected, (state, action) => {
                state.error = action.error;
                state.message = "";
                state.loading = false;
            })
            .addCase(createDownload.pending, (state, action) => {
                state.error = "";
                state.message = "";
                state.loading = true;
            })
            .addCase(createDownload.fulfilled, (state, action) => {
                state.error = "";
                state.message = action.payload.message;
                state.loading = false;
                // state.videoData = action.payload
            })
            .addCase(createDownload.rejected, (state, action) => {
                state.error = action.error;
                state.message = "";
                state.loading = false;
            })
    }
})

export default downloads.reducer