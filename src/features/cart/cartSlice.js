import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        total: 0
    },
    reducers: {
        addItems: (state, action) => {
            const { product, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.cartItems.push({ ...product, quantity });
            }
            state.total += product.price * quantity;
        },
        removeItems: (state, action) => {
            const itemIdToRemove = action.payload;
            const itemToRemove = state.cartItems.find(item => item.id === itemIdToRemove);

            if (itemToRemove) {
                state.total -= itemToRemove.price * itemToRemove.quantity;
                state.cartItems = state.cartItems.filter(item => item.id !== itemIdToRemove);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.total = 0;
        }
    }
});

export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;