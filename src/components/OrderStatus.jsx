import React from 'react'
import {Card,Space,Button} from "antd"
import {useNavigate} from "react-router-dom"

export default function OrderStatus({image,orderText,OrderStatus}) {

    const navigate = useNavigate()

  return (
    <>
          <Card className=" border-none rounded-lg p-10 text-center" style={{boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}} >
           <Space direction='vertical' size="large">
            <img src={image} alt="" className='mx-auto' width={150} />
           <h1 className=' text-3xl md:text-4xl'>{OrderStatus}</h1>
             <p className='text-lg md:text-2xl text-slate-400'> {orderText}</p>
             <Button type='submit' onClick={()=>{navigate("/products")}} style={{background:"#285850"}} className=" text-white hover:bg-slate-500 hover:text-white"    >Continue Shopping</Button>
           </Space>
          </Card>
    </>
  )
}

