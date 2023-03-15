import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import * as API from "../api"
export const login = createAsyncThunk("auth/login", async({fValue, navigate, toast})=>{
    try {
        const res = await API.signin(fValue)
        toast.success("Login successfully")
        navigate("/")
        return res.data
    } catch (error) {
        console.log(error);
    }
})
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false
    },
    extraReducers:{
        [login.pending]:(state,action)=>{
            state.loading= true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading= false,
            localStorage.setItem("profile",JSON.stringify({...action.payload}))
        },
        [login.rejected]:(state,action)=>{
            state.loading= false,
            state.error = action.payload.message
        },
    }
})
export default authSlice.reducer