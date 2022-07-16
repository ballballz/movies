import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    movies: [],
    loading: false,
    error: ''
}

export const dataMovies = createAsyncThunk('get/movies',async()=>{
    const res = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=641e683a2fd457e4bb95f7e58d71e645&query=a')
    
    return res.data.results.map((item)=>{
        return {
            ...item,
            poster_path : 'https://image.tmdb.org/t/p/w500'+item.poster_path,
            price : 100
        }
    })
})


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers:{
        updateprice:(state,action) => {
            state.movies.map((item)=>{
                if(item.id === action.payload.id){
                    item.price = action.payload.price
                }
            })
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(dataMovies.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(dataMovies.fulfilled,(state,action)=>{
            state.loading = false
            state.movies = action.payload
        })
        builder.addCase(dataMovies.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { updateprice } = movieSlice.actions

export default movieSlice.reducer