import React from 'react'
import error from "../../assets/images/order-png/error.png"
import OrderStatus from '../../components/OrderStatus'

export default function Success() {
  return (
      <div className="success h-[100vh] w-[100vw] flex justify-center items-center px-3 md:px-auto" >
        <OrderStatus orderText={"Something went while  Placing order wrong"} OrderStatus={"Payment Failed!"} image={error} />
      </div>
  )
}
