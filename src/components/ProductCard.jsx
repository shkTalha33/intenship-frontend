import { Card,Button ,message,Space} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import DiscountedPriceCalculation from './DiscountedPriceCalculation'

export default function ProductCard({products}) {
  const  navigate = useNavigate()
const {addToCart} = useCartContext()

const handleCart = (product) => {
  addToCart(product)
   message.success("Product is Add to Cart")
}


  return (
    <>
     {products.map((product,i)=>{
        return (
        <Card  hoverable={true} key={i} className='cursor-auto border mx-auto mt-5 w-[80%] md:mt-0 sm:w-[45%] lg:w-[30%] md:mx-2 mb-4   hover:border-0  '>
            <img src={product.img_url}  onClick={()=>{navigate(`/productpage/${product._id}`)}} alt={product.productTitle} className='h-[50%] hover:h-[60%] cursor-pointer  p-2 hover:p-0 transition-all ease-in duration-200' />
          <div className="detail px-5 my-8">
          <p className='text-lg'>{product.productTitle}</p>
          <p className='text-lg'><strong>Condition:  </strong>{product.productCondition}</p>
           <div  className=' xl:flex justify-between items-center'>
             <p className='text-lg'><strong >Discount: <span className='text-red-500'>
             <DiscountedPriceCalculation discount={product.productDiscount} price={product.productPrice} />$
              </span> </strong></p>
             <p className='text-lg'><strong>Price:  </strong><span className='line-through text-slate-400'>{product.productPrice}$</span></p>
           </div>
          <Button type='submit' className='w-full mt-5 bg-yellow-400  text-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer' onClick={()=>handleCart(product)}>Add To Cart</Button>
          </div>
        </Card>
        ) 
    })}
    </>
  )
}
