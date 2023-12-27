import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(true)

  // const navBar = [
  //   { name: "Home", link: "/" },
  //   { name: "About", link: "/" },
  //   { name: "Products", link: "/products" },
  //   { name: "Contact", link: "/" },
  // ];

  return (
    <>
      <div className="navbar  w-full mx-auto  bg-[#285850] text-white ">
      <div className="hamburger-menu  z-30 text-black absolute right-[20px] top-[30px] text-lg md:hidden"
       onClick={()=>setIsOpen(!isOpen)}
       onBlur={()=>setIsOpen(false)}
       >
        {isOpen ? 
        <GiHamburgerMenu />
        :
        <IoCloseSharp />
        }

      </div>
        <ul onBlur={()=>setIsOpen(!isOpen)} className={`md:w-1/3 md:pl-0   md:flex md:justify-center md:items-center  mx-auto absolute right-0 text-right pr-5   w-[80%] h-3/4 md:static bg-[#285850] md:z-auto z-50  md:bg-transparrent ${!isOpen ? "" : "top-[-100%] "} `}>
          
              <li  className="cursor-pointer mx-0 md:mx-5 lg:text-xl  md:text-base py-6  text-white hover:text-[#88c8bc]">
                <Link to="/" onClick={()=>{setIsOpen(!isOpen)}}>Home</Link>
              </li>
              
              <li  className="cursor-pointer mx-0 md:mx-5  lg:text-xl  md:text-base py-6  text-white hover:text-[#88c8bc]">
                <Link to="/products" onClick={()=>{setIsOpen(!isOpen)}}>Products</Link>
              </li>
            
           
        </ul>
      </div>
    </>
  );
}
