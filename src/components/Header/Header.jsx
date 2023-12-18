import { Button, Input, message } from 'antd';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './_header.scss';
import { useProductContext } from '../../context/productContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const {dispatch} = useProductContext()

  const navigate = useNavigate()

  const handleLogout = () => {
    message.success("User logged out successfully")
    navigate("/auth/signin")
     dispatch({type:"SET_LOGGED_OUT"})
  }
 
const {auth} = useProductContext()

  return (
    <>
      <header className="py-4">
        <div className="head-Section md:w-4/6 m-auto  md:flex justify-between items-center block">
          <div className="company-logo font-bold text-[#285850] md:ml-0 ml-[20px] text-2xl md:text-4xl">
            SHOES HUB
          </div>
          <div className="search-bar mx-3 md:mx-0 md:mr-0 pl-4 sm:w-1/2  md:w-1/3   md:mt-0 mt-5 rounded-full">
            <Input.Search
              placeholder="Search..."
              // onSearch={handleSearch}
              enterButton={<SearchOutlined className="flex justify-center items-center " />}
              className="md:w-full  "
            />
           
          </div>
          <div className="auth-section mt-5 md:mt-0 ml-3 md:ml-0">
            {!auth
            ?
            <Button type='submit' className='bg-sky-600 text-white lg:px-7  lg:py-5 md:p-5 flex justify-center items-center hover:text-white hover:bg-sky-500 rounded-lg ' onClick={()=>{navigate("/auth/signin")}}>Login</Button>
            :
            <Button type='submit' className='bg-amber-700 text-white lg:px-7   lg:py-5 md:p-5 flex justify-center items-center hover:text-white hover:bg-amber-800 rounded-lg ' onClick={handleLogout}>Logout</Button>
           
          }
          </div>
        </div>
      </header>
    </>
  );
}
