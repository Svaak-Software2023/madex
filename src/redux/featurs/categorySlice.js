import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const getAllCategory = createAsyncThunk("category/getCategory" , async () => {
    try {
        const response = await api.getAllCategory()
        // console.log("This is the response",response)
        return response.data
    } catch (error) {
        throw error.response.data
    }
})

const categorySlice = createSlice({
    name: "Category",
    initialState: {
        categoryData: null,
        message: "",
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get all category
            .addCase(getAllCategory.pending, (state, action) => {
                state.loading=true,
                state.message="",
                state.error=null
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading=false,
                state.categoryData=action.payload.data
                state.message=action.payload.message,
                state.error=null
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.loading=false,
                state.categoryData=null
                state.message=""
                state.error=action.error
            })
    }
})

export default categorySlice.reducer
