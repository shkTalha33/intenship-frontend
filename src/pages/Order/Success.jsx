import React, { useEffect } from 'react'
import success from "../../assets/images/order-png/success-1.jpg"
import OrderStatus from '../../components/OrderStatus'
import { useCartContext } from '../../context/cartContext'

export default function Success() {

   const {dispatch} = useCartContext()


  useEffect(() => {
    dispatch({type:"CLEAR_CART_PRODUCTS"})
  }, [])
  

  return (
      <div className="success h-[100vh] w-[100vw] flex justify-center items-center px-3 md:px-auto" >
        <OrderStatus orderText={"Your Order Has been Successfully Placed"} OrderStatus={`Congratulations!  ${String.fromCodePoint('0x1f603')} ${String.fromCodePoint('0x1f603')}`} image={success} />
      </div>
  )
}





