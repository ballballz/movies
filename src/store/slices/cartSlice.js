import { createSlice } from "@reduxjs/toolkit";

const get_cart = JSON.parse(localStorage.getItem('cart'));
const check = get_cart ? get_cart : [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: [...check],
    reducers:{
        addcart: (state,action) => {
            const foundData = state.find((item)=>item.id === action.payload.id)
            if(!foundData){
                state.push(action.payload)
            }else{
                return state.map((item)=>({
                    ...item,
                    quantity: item.id === foundData.id ? item.quantity + 1 : item.quantity
                })) 
            }
        },
        clear: (state,action) => {
            localStorage.removeItem('cart');
            return []
        },
        delcart: (state,action) => {
            const new_txt = state.filter((item)=> item.id !== action.payload)
            localStorage.setItem('cart',JSON.stringify(new_txt));
            return new_txt
        }
    }
})

export const { addcart,clear,delcart } = cartSlice.actions

export default cartSlice.reducer