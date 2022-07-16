import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'
import moviesReducer from './slices/movieSlice'

const store = configureStore({
    reducer:{
        movies:moviesReducer,
        cart: cartReducer
    }
})

export default store