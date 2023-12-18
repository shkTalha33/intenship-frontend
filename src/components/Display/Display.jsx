import React from 'react'
import display1 from "../../assets/images/men.jpg"
import display2 from "../../assets/images/women.jpg"

export default function Display() {
  return (
    <>
         <div className="display  md:py-20 py-10">
            <div className="display-text md:w-4/6   my-20 mx-auto text-center">
                <p className='font-extrabold font-mono text-3xl md:text-5xl  leading-tight'>It started with a simple idea: Create quality, well-designed products that I wanted myself.</p>
            </div>
            <div className="display-images m-auto text-center  block md:flex justify-evenly items-center my-9">
               <img src={display1} alt="" className='w-full md:my-0 my-5 md:w-[46%]' />
                {/* <p className='text-3xl font-semibold mt-8 '>Shop Men's Collection</p> */}
               <img src={display2} alt="" className='w-full md:my-0 my-5 md:w-[46%]' />
                {/* <p className='text-3xl font-semibold mt-8'>Shop Women's Collection</p> */}
            </div>
         </div>
    </>
  )
}
