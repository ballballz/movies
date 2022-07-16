import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Row,Col,Button,Empty,Modal } from 'antd'
import { clear,delcart } from '../store/slices/cartSlice'

const Cart = () => {
  const cart = useSelector(state=>state.cart)
  const [total,setTotal] = useState(0)
  const [count,setCount] = useState(0)
  const dispatch = useDispatch()

  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: `กรุณาโอนเงินไปยังบัญชี xxx-x-x2837-x
              ราคาทั้งหมด ${total} บาท`,
      content: `ภายใน ${secondsToGo} วินาที.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `ภายใน ${secondsToGo} วินาที.`,
      });
    }, 1010);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  useEffect(()=>{
    let piece = cart.reduce((sum,e)=>sum + e.quantity,0)
    let result = cart.reduce((sum,e)=>sum + (e.price * e.quantity),0)
    let sum = 0
    setTotal(result)
    setCount(piece)
    if(piece > 5){
      sum = result * 80 / 100
      setTotal(sum)
      setCount(piece)
    }else if(piece > 3){
      sum = result * 90 / 100
      setTotal(sum)
      setCount(piece)
    }else{
      return 
    }

  },[total,cart,count])

  return (
    <div className='cart'>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={4}>
            <h3>Title</h3>
          </Col>
          <Col className="gutter-row" span={4}>
            <h3>Overview</h3>
          </Col>
          <Col className="gutter-row" span={4}>
            <h3>Quantity</h3>
          </Col>
          <Col className="gutter-row" span={4}>
            <h3>price</h3>
          </Col>
          <Col className="gutter-row" span={4}>
            <h3>Total</h3>
          </Col>
          <Col className="gutter-row" span={4}>
            <h3>Action</h3>
          </Col>
        </Row>
        {cart.length !== 0 ?cart.map((item)=>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={4}>
            <p>{item.title}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{item.overview.substring(0,80)}...</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{item.quantity}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{item.price}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{item.price * item.quantity}</p>
          </Col>
          <Col className="gutter-row" span={4}>
            <p>
            <Button type="primary" danger onClick={()=>dispatch(delcart(item.id))}>Delete</Button>
            </p>
          </Col>
        </Row>
        ) : <Empty/ >}
        {cart.length !== 0 &&
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24}>
              <h2>Total : {total} B</h2>
              <h2>Discount : {count > 5 ? '20%' : count > 3 ? '10%' : '-'}</h2>
            </Col>
          </Row>
          <Button type="primary" onClick={countDown}>Buy</Button>
          <Button type="primary" danger onClick={()=>dispatch(clear())}>Clear</Button>
        </>
        }
    </div>
  )
}

export default Cart