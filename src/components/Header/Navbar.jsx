import React, { useEffect, useState } from "react";
import { Link ,useNavigate,useLocation} from "react-router-dom";
import {Tabs,message} from "antd";
import "./_header.scss"
import { useAuthContext } from "../../context/authContext";
import { NavButtons } from "./NavButtons";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("/");
  const navigate = useNavigate()

  const location = useLocation()

  const getCurrentOpenTab = () => {
       const currentTab = location.pathname
       setActiveTab(currentTab)
  }

  useEffect(() => {
    getCurrentOpenTab()
  }, [location.pathname])
  

  const handleNavbar = () => {
     setIsOpen(!isOpen)
  }

  const onChange = (key) => {
    if (key === "/cart") {
      if (!auth) {
        navigate("/auth/signin")
       return message.error("Please Login First")  
      }
    }
   navigate(key)
  };

    const {  auth } = useAuthContext()

  const items = [
    {
      defaultActiveKey:"/",
      key: '/',
      label: 'Home',
    },
    {
      key: '/products',
      label: 'Products',
      
    },
    {
      key: '/cart',
      label: 'Cart',
      
    },
  ];

  return (
    <>
     
      <header className="header bg-[#285850] text-white inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 lg:py-1"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <h1 className="font-bold text-2xl">Shoes Hub</h1>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                onClick={handleNavbar}
                
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 text-white">
             <Tabs defaultActiveKey="1" activeKey={activeTab} items={items} size="large"  onChange={onChange}  />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           <NavButtons direction="horizontal" color="white" size="small" screen="computer"/>
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div className={isOpen ? `  lg:hidden ` : `hidden `} role="dialog" aria-modal="true">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <h1 className="font-bold text-3xl text-slate-600">Shoes Hub</h1>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  onClick={handleNavbar}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                  onClick={()=>{setIsOpen(!isOpen)}}
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-xl font-bold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                  <Link
                  onClick={()=>{setIsOpen(!isOpen)}}
                    to="/products"
                    className="-mx-3 block rounded-lg px-3 py-2 text-xl font-bold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Product
                  </Link>
                  <Link
                  onClick={()=>{setIsOpen(!isOpen)}}
                    to="/cart"
                    className="-mx-3 block rounded-lg px-3 py-2 text-xl font-bold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Cart
                  </Link>
                </div>
                <div className="py-6">
                  <NavButtons direction="vertical" color="black" size="middle"  setIsOpen={setIsOpen} screen="small" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
