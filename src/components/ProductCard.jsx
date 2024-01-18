import { Card,Button ,message} from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import DiscountedPriceCalculation from './DiscountedPriceCalculation'


export default function ProductCard({products,featuredText}) {
  const  navigate = useNavigate()
const {addToCart} = useCartContext()

const handleCart = (product) => {
  addToCart(product)
   message.success("Product is Add to Cart")
}

const cardVarrient = {
  hidden: {  opacity: 0 },
  view: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: .1,
      duration: .5,
    },
  },
};

  return (
    <>
     {products.map((product,i)=>{
        return (
        <Card    hoverable={true} key={i} className='cursor-auto border mx-auto mt-5 w-[80%] md:mt-0 sm:w-[45%] lg:w-[30%] md:mx-2 mb-4   hover:border-0  '>
            <img src={product.img_url}  onClick={()=>{navigate(`/productpage/${product._id}`)}} alt={product.productTitle} className='h-[50%] hover:h-[60%] cursor-pointer  p-2 hover:p-0 transition-all ease-in duration-200' />
          <div className="detail px-5 my-8">
          <p className='text-lg md:text-base lg:text-lg font-bold text-slate-500' style={{color:"gray"}}>{product.productTitle}</p>
          <p className='text-lg md:text-xl'><strong>Condition:  </strong>{product.productCondition}</p>
          <p className='text-lg md:text-xl  '><strong>Price : </strong>
              <span className='text-red-600  font-bold'> 
                  <span style={{color:"red"}}>$<DiscountedPriceCalculation  price = {product.productPrice} discount ={product.productDiscount} /></span>
                  <sub className='text-sm text-black font-bold line-through ml-1'>${product.productPrice}</sub>
              </span>
             
              </p>
          <Button type='submit' style={{background:"#ffd60a"}} className='w-full mt-5   text-white hover:bg-black hover:text-white transition-all duration-300 ease-in-out cursor-pointer' onClick={()=>handleCart(product)}>Add To Cart</Button>
          </div>
        </Card>
        ) 
    })}
    </>
  )
}
