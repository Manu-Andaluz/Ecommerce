import { configureStore } from "@reduxjs/toolkit";

import productsReducer, { productsFetch } from "../slices/productsSlice";
import productDetails from "../slices/productDetails";
import cartReducer, { getTotals } from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
import { productsApi } from "../slices/productsApi";
import dataList from "../slices/dataList";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        auth: authReducer,
        dataList: dataList,
        productDetails: productDetails,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());