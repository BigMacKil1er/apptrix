import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cart_slice/cartSlice';
import orderSlice from './order_slice/orderSlice';

const rootReducer = combineReducers({
    cart: cartSlice,
    orders: orderSlice
});

export default rootReducer;