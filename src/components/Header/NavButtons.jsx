import React from 'react'
import {Space,Button,Badge,message} from  "antd"
import { useAuthContext } from "../../context/authContext";
import { useCartContext } from '../../context/cartContext';
import { LuShoppingCart } from "react-icons/lu";
import {useNavigate} from "react-router-dom"

export const NavButtons = ({direction,color,size,setIsOpen,screen}) => {
    const navigate = useNavigate()
    const {cart} = useCartContext()
 
 
    const handleCart = () => {
        if (screen === "small") {
            setIsOpen(false)   
        }
         if (auth) {
          navigate("/cart")
         }else{
           message.error("Please Login First")
         }
      }

      const handleLogout = () => {
        if (screen === "small") {
            setIsOpen(false)   
        }
        message.success("User logged out successfully");
        localStorage.removeItem("auth-token");
        // navigate("/auth/signin")
        dispatch({ type: "SET_LOGGED_OUT" });
      };

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const {  auth,dispatch } = useAuthContext()
  return (
    <>
           <Space direction={direction} size={size}>
            {!auth ? 
            <>
            <Button
            type="submit"
            size='large'
            className="bg-sky-600 text-white lg:px-7  lg:py-5 md:p-5 flex justify-center items-center hover:text-white hover:bg-sky-500 rounded-lg "
            onClick={() => {
              navigate("/auth/signin");
            }}
            style={{background:"#0077b6"}}
          >
            Login
          </Button>
            </>
              :
              <>
            <Button
            type="submit"
            size='large'
            className="bg-sky-600 text-white lg:px-7  lg:py-5 md:p-5 flex justify-center items-center hover:text-white hover:bg-sky-500 rounded-lg "
            onClick={() => {
              navigate("/dashboard");
            }}
            style={{background:"#0077b6"}}
          >
            Dashboard
          </Button>
          <Button
            type="submit"
            size='large'
            className="bg-amber-700 text-white lg:px-7   lg:py-5 md:p-5 flex justify-center items-center hover:text-white hover:bg-amber-800 rounded-lg "
            style={{background:"#d90429"}}
            onClick={handleLogout}
          >
            Logout
          </Button>
          
              </>
             }
              <Badge count={totalItems} color="#faad14" className='cursor-pointer'>
                      <LuShoppingCart className={`text-2xl text-${color}`} onClick={handleCart} />
               </Badge>
            </Space>
    </>
  )
}
