import { Button, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../../../context/cartContext'
import DiscountedPriceCalculation from "../../../components/DiscountedPriceCalculation"

export default function ProductPage() {

    const [singleProduct, setSingleProduct] = useState({})
    const params = useParams()
    const productId = params.id
     const {dispatch} = useCartContext()

    const handleAddToCart = (product) => {
        message.success("Product is Add To Cart")
        dispatch({type:"ADD_TO_CART",payload:product})
      
    }

 
    useEffect(() => {
const headers = {
     'Content-Type':'application/json'
}

      axios.get(`${import.meta.env.VITE_APP_BASE_URL}/products/getsingleproduct/${productId}`,{headers})
      .then(res=>{
        const responce = res.data.message[0]
        setSingleProduct(responce)
      })
      .catch(err=>{
        console.error(err);
      })

      
    }, [])
    
    
  return (
    <>
     
       <div className="single-page md:w-4/6 md:flex justify-between    mx-auto md:py-20 py-10">
           <div className="img-section mx-auto w-[60%]  md:w-[46%]">
            <img  src={singleProduct.img_url} alt={singleProduct.productTitle} />
           </div>
           <div className="detail-section px-3 md:px-0 mx-auto md:w-[46%]">
              <p className='text-2xl md:text-3xl font-bold'>{singleProduct.productTitle}</p>
              <p className='text-xl md:text-3xl my-10 '><strong>Price : </strong>
              <span className='text-red-600'> 
                  $<DiscountedPriceCalculation price = {singleProduct.productPrice} discount ={singleProduct.productDiscount} />
                  <sub className='text-sm text-black font-bold line-through ml-1'>${singleProduct.productPrice}</sub>
              </span>
             
              </p>
              {/* <p className='text-xl md:text-3xl my-10 '><strong>Price : </strong><span className='text-slate-400 line-through'> ${singleProduct.productPrice}</span></p> */}
              {singleProduct.productSizes && (
              <p className=' text-xl md:text-3xl my-5 md:my-10 px-2 inline bg-[#88c8bc]'>
              <strong>Sizes : </strong>
              {singleProduct.productSizes.slice(0, -1).join(" / ")}
              {singleProduct.productSizes.length > 1 && (
                <span> / {singleProduct.productSizes.slice(-1)}</span>
              )}
            </p>
              )}

              <p className='text-xl md:text-3xl my-5 md:my-10 '><strong>Condition : </strong>{singleProduct.productCondition}</p>
              
              <Button type='submit'  className='w-full my-5 md:my-20  bg-yellow-400 hover:bg-black hover:text-yellow-400' onClick={()=>handleAddToCart(singleProduct)}>Add To Cart</Button>
           </div>
       </div>
    </>
  )
}
