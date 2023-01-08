import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  status: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(`${url}/products`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productDelete = createAsyncThunk(
  "products/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productEdit = createAsyncThunk(
  "products/productEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Producto Creado!");
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(item => item._id !== action.payload._id)
      state.items = newList
      state.deleteStatus = "success";
      toast.success("Producto Eliminado!");
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
    [productEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productEdit.fulfilled]: (state, action) => {
      const updateProducts = state.items.map(product =>
        product._id === action.payload._id ? action.payload : product
      )
      state.items = updateProducts
      state.editStatus = "success";
      toast.success("Producto Editado!");
    },
    [productEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
  },
});

export default productsSlice.reducer;
