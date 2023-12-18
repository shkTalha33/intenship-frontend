import { Card } from 'antd'
import React, { useEffect, useState } from 'react'

import "./_featuredItems.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FeaturedItems() {

  const  navigate = useNavigate()


    const [products, setProducts] = useState([])

    useEffect(() => {

      axios.get("http://localhost:8000/items/featured")
      .then(res=>{
         const response = res.data.message
        setProducts(response)
      })
      .catch(err=>{
        console.error(err);
      })
    }, [])
    

   

  return (
    <>
        <div className="featured-items my-20 ">
            <div className="featured-text font-bold font-serif text-4xl text-center mb-20">
                FEATURED ITEM'S
            </div>
            <div className="featured-images md:w-5/6 md:flex mx-auto px-2 justify-between items-center flex-wrap">
                {products.map((product,i)=>{
                    return (
                    <Card hoverable={true} key={i} onClick={()=>{navigate(`/productpage/${product._id}`)}} className='w-full border  md:w-1/4 md:mx-2  my-5 cursor-pointer hover:border-0  '>
                        <img src={product.img_url} alt={product.productTitle} className='h-[50%] hover:h-[60%]  p-2 hover:p-0 transition-all ease-in duration-200' />
                      <div className="detail px-5 my-8">
                      <p className='text-lg'>{product.productTitle}</p>
                      <p className='text-lg'><strong>Condition:  </strong>{product.productCondition}</p>
                      <p className='text-lg'><strong>Price:  </strong>{product.productPrice}$</p>
                      </div>
                    </Card>
                    ) 
                })}
                <Card>
               
                </Card>
            </div>
        </div>
    </>
  )
}
