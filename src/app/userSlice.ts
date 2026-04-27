'use client'

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store"; 

interface UserData {
  _id: string;
  email: string;
  [key: string]: unknown; 
}
interface UserInfo {
  islogin: boolean;
  userId: string;
  email: string;
}

interface UserState {
  error: string | undefined ;
  status: 'idle' | 'loading' | 'logout' | 'error';
  userInfo: UserInfo;
}

interface StorageUserData {
  userId: string;
  email: string;
}



export const login = createAsyncThunk<UserData, string>("user/login", async (email) => {
    const response = await axios.get<UserData>(`http://localhost:5000/login?email=${email}`);
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
});

export const signup = createAsyncThunk<UserData, string>("user/signup", async (email) => {
    const response = await axios.post<UserData>(`http://localhost:5000/signup`, { email });
    if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
});


const initialState : UserState = {
    error: "",
    status: "idle",
    userInfo: {
        islogin: false,
        userId: "",
        email: ""
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
          logout(state) {
            state.status="logout"
            state.userInfo = { islogin: false, userId: "", email: "" };
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
            }
        },

        setUserFromStorage(state, action) {
            const { userId, email } = action.payload;
            state.userInfo = {
                islogin: true,
                userId,
                email
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = {
                    islogin: true,
                    userId: action.payload._id,
                    email: action.payload.email
                };
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.userInfo = {
                    islogin: true,
                    userId: action.payload._id,
                    email: action.payload.email
                };
                state.status = 'idle';
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message;
            });
    }
});

export const { logout, setUserFromStorage } = userSlice.actions;

export const selectLogin = (state: RootState) => state.user;
export default userSlice.reducer;
