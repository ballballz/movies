import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {dataMovies} from './store/slices/movieSlice';
import { Routes,Route } from 'react-router-dom'
import './App.css';
import { Footer,Navbar,Tabledata } from './components'
import { Home,Cart } from './pages'

function App() {
  const dispatch = useDispatch()
  const movies = useSelector(state=>state.movies)

  useEffect(()=>{
    if(movies.loading) return
    dispatch(dataMovies())
  },[])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/data' element={<Tabledata />}></Route>
      </Routes>
      <div className='control-footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
