import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js"

export const login = createAsyncThunk("auth/login", async ({ formData, navigate }) => {
  try {
    const response = await api.login(formData);
    setTimeout(() => {
      if (formData.emailAndUserName === "gabbar@gmail.com" || formData.emailAndUserName === "gabbar_07")
        navigate("/admin")
      else
        navigate("/second-home")
    }, 1000)
    return response.data
  } catch (error) {
    throw error.response.data.statusCode
  }
})

export const createAccount = createAsyncThunk("auth/createAccount", async ({ data, navigate }) => {
  try {
    const response = await api.createAccount(data);
    setTimeout(() => {
      navigate("/login")
    }, 2000)
    return response.data
  } catch (error) {
    throw error.response.data.statusCode
  }
})
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    user: null,
    loading: false,
    error: {},
    signUpError: {},
    signUpmessage: ""
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.user = action.payload?.user;
    },
    setLogout: (state, action) => {
      localStorage.clear()
      state.user = null
      location.reload();
    }
  },
  extraReducers: (builder) => {
    builder
      // login reducer 
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = {}
        state.message = ""
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.user = action.payload.data.user
        localStorage.setItem("accessToken", JSON.stringify(action.payload.data && action.payload.data))
        state.message = action.payload.message
        state.error = {}
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.message = ""
      })
      // create account  reducer 
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.signUpError = {}
        state.signUpmessage = ""
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        // state.user = action.payload.data
        state.signUpmessage = action.payload.message
        state.signUpError = ""
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.signUpError = action.error;
        state.signUpmessage = ""
      });
  }
})

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;