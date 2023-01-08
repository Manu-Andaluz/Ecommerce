import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
    product: {}
};

export const productDetails = createAsyncThunk(
    "products/productDetails",
    async (productId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/find/${productId}`);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);



const productDetail = createSlice({
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: {
        [productDetails.pending]: (state, action) => {
            state.status = "pending";
        },
        [productDetails.fulfilled]: (state, action) => {
            state.product = action.payload;
            state.status = "success";
        },
        [productDetails.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default productDetail.reducer;
