import { Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({products}) {
  const  navigate = useNavigate()

  return (
    <>
     {products.map((product,i)=>{
        return (
        <Card hoverable={true} key={i} onClick={()=>{navigate(`/productpage/${product._id}`)}} className=' border mx-auto mt-5 w-[70%] md:mt-0 sm:w-[45%] lg:w-[30%] md:mx-2 mb-4  cursor-pointer hover:border-0  '>
            <img src={product.img_url} alt={product.productTitle} className='h-[50%] hover:h-[60%]  p-2 hover:p-0 transition-all ease-in duration-200' />
          <div className="detail px-5 my-8">
          <p className='text-lg'>{product.productTitle}</p>
          <p className='text-lg'><strong>Condition:  </strong>{product.productCondition}</p>
          <p className='text-lg'><strong>Price:  </strong>{product.productPrice}$</p>
          </div>
        </Card>
        ) 
    })}
    </>
  )
}
