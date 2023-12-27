import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext'
import {useLocation,Navigate} from "react-router-dom"
import {Spin} from "antd"

export default function privateRoute({Component}) {

    const location = useLocation()
    
 const token =  localStorage.getItem("auth-token")

   if (!token) {
    return <Navigate to="/auth/signin" state={{from:location.pathname}} replace /> 
    }
 

  return (
    <>
         <Component />
    </>
  )
}
