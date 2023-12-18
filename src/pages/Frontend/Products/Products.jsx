import { Card, Input, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {

  const  navigate = useNavigate()
  
  const [products, setProducts] = useState([])

   useEffect(() => {
    const headers = {
       'Content-Type' : 'application/json'
    }
    axios.get("http://localhost:8000/products/getproducts",{headers})
    .then(res=>{
      const responce = res.data.message
      setProducts(responce)
       
    })
    .catch(err=>{
      console.error(err);
    })
   }, [])
   


  return (
    <>
        <div className="upper-side md:flex justify-between items-center w-5/6 mx-auto py-10 md:py-20">
           <div className="search-section my-7 md:my-0 md:w-1/5">
          <Input.Search     placeholder='Search Here...' />
           </div>
           <div className="total-products md:w-3/5 text-center text-2xl hidden md:block">Total Products {products.length}</div>
           <div className="filteration-section text-xl md:w-1/5">
              <Select className='w-[100%] text-lg' placeholder="Filter Products" >
                 <Select.Option  value="a-z">Title: A-Z</Select.Option>
                 <Select.Option  value="z-a">Title: Z-A</Select.Option>
                 <Select.Option  value="lowTohigh">Price: Low to High</Select.Option>
                 <Select.Option  value="highToLow">Price: High to low</Select.Option>
                 <Select.Option  value="newToOld">Date: New to Old</Select.Option>
                 <Select.Option  value="oldToNew">Date: Old to New</Select.Option>
                 <Select.Option  value="discount">Discount: High to Low</Select.Option>
                 <Select.Option  value="featured">Featured Item</Select.Option>
              </Select>
           </div>
        </div>
        <div className="sidebar md:flex w-5/6 mx-auto">
           <div className="sizes-filteration md:w-[30%] lg:w-1/5 ">
               <div className="sizes-box border flex  items-center justify-between flex-wrap w-full px-4 py-6">
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
                  <div className="boxes border hover:bg-[#285850] hover:text-white cursor-pointer  p-2 my-2">EUR 90</div>
               </div>
           </div>
           <div className="all-products md:w-[70%] lg:w-4/5">
               <div className="sizes-box flex-wrap md:flex items-center justify-evenly">
                {products.length < 1  ? 
                <div className="no-product text-center text-4xl">
                     No Products To Show
                </div>
                :
               products.map((product,i)=>{
                  return(
                    <Card key={i} hoverable={true} onClick={()=>{navigate(`/productpage/${product._id}`)}}  className="cursor-pointer border hover:border-0 w-full md:w-[45%] lg:w-[30%] my-3">
                      <img src={product.img_url} alt={product.productTitle} className='h-[50%] hover:h-[60%] p-2 hover:p-0 transition-all ease-in duration-200' />
                      <div className="detail px-5 my-8">
                      <p className='text-lg'>{product.productTitle}</p>
                      <p className='text-lg'><strong>Condition:  </strong>{product.productCondition}</p>
                      <p className='text-lg'><strong>Price:  </strong>{product.productPrice}$</p>
                      </div>
                    </Card  >
                  )
               })
              }
               </div>
           </div>
        </div>
    </>
  )
}
