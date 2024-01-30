import { createSlice } from "@reduxjs/toolkit";

const GlobalFunctionSlice =createSlice({
    name:"Global Function",
    initialState:{
        isMenuOpen:false
    },
    reducers:{
        setmenu:(state,action)=>{
            state.isMenuOpen=action.payload
        }
    }
})

export const {setmenu} =GlobalFunctionSlice.actions;
export default GlobalFunctionSlice.reducer;