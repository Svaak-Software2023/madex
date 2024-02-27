import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const getShorts= createAsyncThunk("/getShorts",async()=>{
    try{
        const response = await api.getShorts();
        return response.data
    }
    catch(err){
        throw err
    }
})
const shortsSlice=createSlice({
name:"Shorts",
initialState:{
    data:[],
    message:"",
    error:"",
    loading:true
},
extraReducers:(builder)=>{
    builder
    .addCase(getShorts.pending,(state,action)=>{
        state.message=""
        state.loading=true,
        state.error=""
    })
    .addCase(getShorts.fulfilled,(state,action)=>{
        state.data=action.payload?.data?.shortsVideos
        state.message=""
        state.loading=true,
        state.error=""
    })
    .addCase(getShorts.rejected,(state,action)=>{
        state.message=""
        state.loading=true,
        state.error=""
    })
}});

export default shortsSlice.reducer