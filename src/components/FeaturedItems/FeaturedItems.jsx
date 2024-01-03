import React, { useEffect, useState } from 'react'

import "./_featuredItems.scss"
import axios from 'axios'
import ProductCard from '../ProductCard'

export default function FeaturedItems() {



    const [products, setProducts] = useState([])

    useEffect(() => {

      axios.get(`${import.meta.env.VITE_APP_BASE_URL}/items/featured`)
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
               <ProductCard products={products}  />
            </div>
        </div>
    </>
  )
}
