import React,{ useEffect, useState } from 'react'
import AddAndUpdatePage from '../../../components/DashboardCompoenets/AddAndUpdatePage'
import {useParams } from "react-router-dom"
import axios from "axios"

export default function UpdateProduct() {

    const params = useParams()
    const [updatedproduct, setUpdatedproduct] = useState({})


    useEffect(() => {
        const headers = {
             'Content-Type':'application/json'
        }
              axios.get(`${import.meta.env.VITE_APP_BASE_URL}/products/getsingleproduct/${params.id}`,{headers})
              .then(res=>{
                const responce = res.data.message[0]
                setUpdatedproduct(responce)
              })
              .catch(err=>{
                console.error(err);
              })
        
              
            }, [])
  return (
    <>
         <AddAndUpdatePage title={"Update Product"} updatedProduct={updatedproduct} api={`updateproduct/${updatedproduct._id}`}  dispatchType={"UPDATE_PRODUCT"} messageType={"Updated"}  />
    </>
  )
}
