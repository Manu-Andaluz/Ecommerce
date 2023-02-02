import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
    userList: [],
    orderList: []
};

export const getUserList = createAsyncThunk(
    "userList/getUserList",
    async () => {
        try {
            const response = await axios.get(`${url}/users`);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getOrderList = createAsyncThunk(
    "orderList/getOrderList",
    async () => {
        try {
            const response = await axios.get(`${url}/orders`);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);


const dataList = createSlice({
    name: "dataList",
    initialState,
    reducers: {},
    extraReducers: {
        [getUserList.fulfilled]: (state, action) => {
            state.userList = action.payload;
            state.status = "success";
        },
        [getOrderList.fulfilled]: (state, action) => {
            state.orderList = action.payload;
            state.status = "success";
        }
    },
});

export default dataList.reducer;