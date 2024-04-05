import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    status: 'idle'
};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        //slice don't know how to do async functions
        // fetchProducts(state, action) {
        //     state.data = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.status = "Loading";
                console.log("*****************Loading Data*************");
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                // state.status = "Loaded";
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = "error";
            });
    }
});
export default productSlice.reducer;
export const { fetchProducts } = productSlice.actions;

export const getProducts = createAsyncThunk("products/get", async () => {
    const data = await fetch("https://fakestoreapi.com/products")
    const result = await data.json();
    return result;
});

// export function getProducts() {
//     return async function getProductsThunk(dispatch, getState) {
//         //api
//         const data = await fetch("https://fakestoreapi.com/products")
//         const result = await data.json();
//         dispatch(fetchProducts(result));
//     }
// }