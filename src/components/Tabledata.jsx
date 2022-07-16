import React, { useEffect, useState } from 'react'
import { Space, Table, Input,Pagination  } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { updateprice } from '../store/slices/movieSlice';
const { Column } = Table;

const Tabledata = () => {
  const dispatch = useDispatch()
  const movies = useSelector(state=>state.movies)
  const [edit,setEdit] = useState(false)
  const [price,setPrice] = useState(0)
  const [id,setID] = useState('')

  const onEdit = (item) => {
    setID(item.id)
    setPrice(item.price)
    setEdit(true)
  }

  const Cancel = () => {
    setID('')
    setPrice(0)
    setEdit(false)
  }

  const updatePrice = (item) => {
    dispatch(updateprice(item))
    setID('')
    setPrice(0)
    setEdit(false)
  }

  useEffect(()=>{
    const re = /^[0-9\b]+$/;
    if(re.test(price) || price === 0){
      console.log(price)
    }else{
      alert('please 0-9')
      setEdit(false)
      return
    }
  },[price])

  return (
    <div className='tabledata'>
      <table width='100%'>
        <thead>
          <tr>
            <th width='25%'>Title</th>
            <th width='45%'>Overview</th>
            <th width='10%'>Price</th>
            <th width='20%'>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.movies.map((item)=>
            <tr>
              <td>{item.title}</td>
              <td>{item.overview.substring(0,80)}</td>
              {edit && item.id === id ? <input value={price} onChange={(e)=>setPrice(e.target.value)}/> : <td>{item.price}</td>}
              <td>
              {edit && item.id === id ? 
                <>
                  <button onClick={()=>updatePrice({...item,price:price})}>Update</button>
                  <button onClick={Cancel}>Cancel</button>
                </>
               : 
               <button onClick={()=>onEdit({...item})}>Edit</button>}
                
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Tabledata