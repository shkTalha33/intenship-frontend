import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const navBar = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Contact", link: "/" },
  ];

  return (
    <>
      <div className="navbar  w-full mx-auto  bg-[#285850] text-white ">
      <div className="hamburger-menu  z-30 text-black absolute right-[20px] top-[30px] text-lg md:hidden" onClick={()=>setIsOpen(!isOpen)}>
        {isOpen ? 
        <GiHamburgerMenu />
        :
        <IoCloseSharp />
        }

      </div>
        <ul className={`md:w-1/3 md:pl-0 pl-[70%]  md:flex md:justify-between md:items-center  mx-auto absolute  w-full h-1/2 md:static bg-[#285850] md:z-auto z-50  md:bg-transparrent ${!isOpen ? "" : "top-[-100%]"} transition-all  duration-500 ease-in-out`}>
          {navBar.map((nav,i) => {
            return (
              <li key={i} className="cursor-pointer  lg:text-xl  md:text-base py-6 right-0 text-white hover:text-[#88c8bc]">
                <Link to={nav.link}>{nav.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
