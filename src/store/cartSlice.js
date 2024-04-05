import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload); //IMMER JS
        }
    }
});

export default cartSlice.reducer;
export const { add } = cartSlice.actions; 