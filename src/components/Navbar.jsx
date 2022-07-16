import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cart = useSelector(state=>state.cart)

  return (
    <div className='navbar'>
      <ul>
        <li><Link to='/'>Movie</Link>{' '}<Link to='/data'>addprice</Link></li>
        <li>
          <Link to='/cart'>
            <div className='style-cart'>
              <ShoppingCartOutlined />
              <p className='cart-total'>{cart.reduce((sum,e)=>sum + e.quantity,0)}  </p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar