import React from 'react'
import Frontend from "./Frontend"
import Auth from "./Auth"
import OrderStatus from "./Order"
import Dashboard from "./Dashboard"
import {Routes,Route} from "react-router-dom"


export default function Index() {

    // const {auth} = useAuthContext()

    // if (!auth) {
    //    return <Spin className="h-[100vh] w-[100vw] flex items-center justify-center " spinning={true} size='large' ></Spin>
    // }

  return (
    <>
       <Routes>
          <Route path="/*" element={<Frontend/>} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path='/order/*' element={<OrderStatus />} />

       </Routes>
    </>
  )
}
