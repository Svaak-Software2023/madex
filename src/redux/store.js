import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./featurs/authSlice";
import videoSlice from "./featurs/videoSlice";
import categorySlice from "./featurs/categorySlice";
import channelSlice from "./featurs/channelSlice";
const store=configureStore({
    reducer:{
        auth:authSlice,
        video:videoSlice,
        category:categorySlice   ,
        channel:channelSlice 
    }
})

export default store;