import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const getWatchLater=createAsyncThunk("get/watchLater", async (userId)=>{

})
const watchLater =createSlice({
    name:"Watch Later",
    initialState:{
        videoData:[],
        message:"",
        error:"",
        loading:false
    },

    extraReducers:(builder)=>{
        builder
        .addCase(getWatchLater.pending,(state,action)=>{
            
        })
        .addCase(getWatchLater.fulfilled,(state,action)=>{

        })
        .addCase(getWatchLater.rejected,(state,action)=>{

        })
    }
})

export default watchLater.reducer