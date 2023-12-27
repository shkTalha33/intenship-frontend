import React from 'react'
import {Routes,Route} from "react-router-dom"
import Success from './Success'
import Cancel from "./Cancel"

export default function index() {
  return (
    <>
       <Routes>
          <Route path='/'>
             <Route path='success/' element={<Success />} /> 
             <Route path='cancel/' element={<Cancel />} /> 
          </Route>
       </Routes>
    </>
  )
}
