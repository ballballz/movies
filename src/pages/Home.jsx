import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined,SearchOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux'
import { Row,Col,Card } from 'antd'
import { Link } from 'react-router-dom'
import { addcart } from '../store/slices/cartSlice';

const Home = () => {
  const movies = useSelector(state=>state.movies)
  const cart = useSelector(state=>state.cart)

  const [search,setSearch] = useState('')
  const dispatch = useDispatch()

  const addCart = (data) => {
    dispatch(addcart(data))
  }

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify([...cart]));
  },[cart])

  return (
    <div className='container'>
        <SearchOutlined style={{ fontSize: '20px'}}/>
        <input className='search' placeholder='search movie' onChange={(e)=>setSearch(e.target.value)}/>
        <Row gutter={[24, 16]}>
        {movies.movies.filter((item)=>item.title.toLowerCase().includes(search)
        ).map((item)=>{
            return (
              <Col className="gutter-row" span={6} key={item.id}>
                  <Card
                    style={{ width: 300}}
                    cover={
                      <img src={item.poster_path} />
                    } 
                    actions={[
                      <p onClick={()=>addCart({...item,id:item.id,quantity : 1})}><ShoppingCartOutlined style={{fontSize: '20px'}}/> Add To Cart</p>
                    ]}
                    >
                    <h4>{item.title}</h4>
                    <p>{item.overview.substring(0,80)} More ...</p>
                  </Card>
              </Col>
            )
        })}
        </Row>
    </div>
  )
}

export default Home