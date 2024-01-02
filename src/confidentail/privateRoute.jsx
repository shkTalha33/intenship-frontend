import React from 'react'
import {useLocation,Navigate} from "react-router-dom"

export default function privateRoute({Component}) {

    const location = useLocation()
    
 
   const  token =  localStorage.getItem("auth-token")




if (!token) {
 return <Navigate to="/auth/signin" state={{from:location.pathname}} replace /> 
 }

 

  return (
    <>
         <Component />
    </>
  )
}
