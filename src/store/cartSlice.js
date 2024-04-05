import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload); //IMMER JS
        },
        remove(state, action) {
            return state.filter(item => item.id !== action.payload);
        }
    }
});

export default cartSlice.reducer;
export const { add, remove } = cartSlice.actions; 