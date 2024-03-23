import { createSlice } from "@reduxjs/toolkit"
import { ICartItem } from "../../../../shared/types/item";
import { RootState } from "../..";


type order = {
    address: string
    author: string
    payment: string
    order: ICartItem[];
}
type orderState = {
    orders: order[]
  };

const initialState: orderState = {
    orders: []
}

const cartSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrderItems: (state, action)=>{
            const {orders} = action.payload
            state.orders = orders
        },
    },
})

export const { setOrderItems } = cartSlice.actions

export default cartSlice.reducer
export const checkPosition = (state: RootState) => state.orders.orders;