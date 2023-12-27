import React, { useEffect, useState } from "react";
import { Tooltip, Modal, message ,Button,Space,Card,Divider,Image} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useCartContext } from "../../../context/cartContext";
import {DeleteFilled} from "@ant-design/icons"
import {useNavigate} from "react-router-dom"
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios'

export default function Cart() {
  const { cart,dispatch } = useCartContext();
  const [totalPrice, setTotalPrice] = useState(null)

  const navigate = useNavigate()

const calculatePrice = () => {
     const totalPrice = cart.reduce((initailState,price)=> initailState + (price.quantity * price.productPrice),0)
     setTotalPrice(totalPrice)
}

useEffect(() => {
   calculatePrice()
}, [cart])


 const handleClearProducts = () => {
      dispatch({type:"CLEAR_CART_PRODUCTS"})
 }

const handleIncrement = (id) => {
     dispatch({type:"SET_INCREMENT",payload:id})
    }
    const handleDecrement = (id) => {
  dispatch({type:"SET_DECREMENT",payload:id})
}

  const handleDelete = (id) => {
    Modal.confirm({
      maskClosable: true,
      centered: true,
      title: "Are you sure to delete the product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "default",
      cancelText: "No",
      onOk:()=>{handleOk(id)}
    });
  };

  const handleOk = (id) => {
    message.success("Product deleted sucessfully")
    dispatch({type:"DELETE_CART_PRODUCT",payload:id})
  }

  const handleCheckout = async() => {
      const stripe = await loadStripe("pk_test_51ORtMEAmRaMI31IDAWhKtpfE8cxcPgpgdcJt8EPyDERc57uWdBlZkl0OUO8dPfwJCeGuIOBajavIB54MdqW7ikVY00RE5wQ9Zz")
      const body ={
        products:cart
      }
      const headers = {
         "Content-Type" : "application/json"
      }

       axios.post("http://localhost:8000/items/create-checkout-session",body,{headers})
      .then(res=>{
      
         const session = res.data
         console.log(session)
         const result = stripe.redirectToCheckout({
          sessionId:session.id
         })
         console.log(result)
      })
      .catch(err=>{
         console.log(err)
      })
  }


  return (
    <>
      <div
        className="cart md:w-4/6 mx-auto"
        style={{ minHeight: `calc(100vh - 206px)` }}
      >
        {cart.length === 0 ? (
       
          <h1  className="flex pt-[50%] md:pt-[25%] item-center  justify-center text-2xl   md:text-4xl font-bold text-teal-400">No Products To Show</h1>
        ) : 

        <>
        <h1 className="text-gray-300 font-bold text-2xl  md:text-4xl text-center mt-20 mb-10">
          Cart Products
        </h1>



           
          <div className="overflow-x-auto mb-8 mt-20">
            <table className="min-w-full bg-white  hover:table-fixed  ">
              <thead  style={{backgroundColor:"#001f54"}} className="text-white" > 
                <tr className="text-lg ">
                  <th className="px-4 py-6 "> Image</th>
                  <th className="px-4 py-6 ">Price</th>
                  <th className="px-4 py-6 ">Quantity </th>
                  <th className="px-4 py-6 "> SubTotal   </th>
                  <th className="px-4 py-6 ">Delete</th>
                </tr>
              </thead>
              <tbody className="border-none">
                
          
                { cart.map((prod,i)=>{
                    return(
                       <tr key={i} className="hover:bg-gray-100 text-center text-xl font-bold  border-b-2 ">
                       <td className=" w-[70px]"><Image className="rounded-full" src={ prod.img_url} width="100%" /></td>
                       <td >{prod.productPrice}</td>
                       <td className=" text-slate-500">
                         <Space>
                         <Button type="submit" className="bg-red-600 text-white" onClick={()=>handleDecrement(prod._id)} > - </Button>
                           <span className="text-2xl">{prod.quantity}</span>
                         <Button type="submit" className="bg-blue-600 text-white" onClick={()=>handleIncrement(prod._id)} > + </Button>
                         </Space>
                       </td>
                       <td className="  ">{prod.productPrice * prod.quantity}</td>
                       <td className="  font-bold text-2xl text-red-600 ">
                         <Tooltip title="Delete" placement="right" >
                         <DeleteFilled  className="mx-auto cursor-pointer" onClick={()=>handleDelete(prod._id)}  />
                         </Tooltip>
                       </td>
                     </tr>
                    )
                })
      

          }   
              </tbody>
            </table>

          </div>
              <div className="flex items-center justify-between md:justify-around mb-5">
                 <Button type="submit" className="bg-blue-500 text-white mr-0 hover:bg-blue-400" size="large" onClick={()=>navigate("/products")} >Continue Shopping</Button>
                 <Button type="submit" className="bg-red-500 text-white hover:bg-red-400" size="large" onClick={handleClearProducts}>Clear Products</Button>
           
              </div>
              <div className="checkout sm:w-[70%] md:w-[70%] lg:w-[40vw] xl:w-[40%] my-20 m-auto">
                  <Card  className=" px-5 py-5 sm:p-16 mx-5 md:mx-0 bg-neutral-100 border-0 rounded-md" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px"}}>
                      <Space className="flex items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-semiBold">Sub Amount</h1>
                        <p className="text-xl sm:text-2xl text-slate-500">{totalPrice}$</p>
                      </Space>
                      <br />
                      <Space className="flex items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-semiBold">Shipping Fees</h1>
                        <p className="text-xl sm:text-2xl text-slate-500">30$</p>
                      </Space>
                   
                      <Divider className="w-[80%] mx-auto"/>
                      <Space className="flex items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-semiBold">Total Amount</h1>
                        <p className="text-xl sm:text-2xl text-slate-500">{totalPrice + 30}$</p>
                      </Space>
                      <Space  className="flex items-center justify-end mt-4 ">
                      <Button type="submit" className="bg-red-800 mt-4  text-white hover:bg-green-600" size="large" onClick={handleCheckout}>Checkout</Button>
                      </Space>
                  </Card>
              </div>
        </>
          }
      </div>
    </>
  );
}