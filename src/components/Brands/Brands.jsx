import React from 'react'
import brand1 from "../../assets/images/brand-1.jpg"
import brand2 from "../../assets/images/brand-2.jpg"
import brand3 from "../../assets/images/brand-3.jpg"
import brand4 from "../../assets/images/brand-4.jpg"
import brand5 from "../../assets/images/brand-5.jpg"


export default function Brands() {

  return (
    <>
       <div className="brands my-5 md:my-20">
         <div className="brands-text text-center text-xl font-bold text-gray-300">
            TRUSTED PARTNERS
         </div>
         <div className="brands-logo w-[94%] md:w-4/6 m-auto pt-9 pb-20  flex-wrap my-3 flex justify-between items-center">
            <img src={brand1} alt="" className='my-3 w-[46%] md:w-[16%]' />
            <img src={brand2} alt="" className='my-3 w-[46%] md:w-[16%]' />
            <img src={brand3} alt="" className='my-3 w-[46%] md:w-[16%]' />
            <img src={brand4} alt="" className='my-3 w-[46%] md:w-[16%]' />
            <img src={brand5} alt="" className='my-3 w-[46%] md:w-[16%]' />
         </div>
       </div>
    </>
  )
}
