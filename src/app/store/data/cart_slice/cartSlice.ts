import { createSlice } from "@reduxjs/toolkit"
import { ICartItem } from "../../../../shared/types/item";
import { RootState } from "../..";



type cartState = {
    position: ICartItem[];
  };

const initialState: cartState = {
    position: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action)=>{
            const {position} = action.payload
            state.position = position
        },
    },
})

export const { setCartItems } = cartSlice.actions

export default cartSlice.reducer
export const checkPosition = (state: RootState) => state.cart.position;