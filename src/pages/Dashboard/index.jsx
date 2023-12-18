import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './Products'

export default function index() {
  return (
    <>
        <Routes>
            <Route path='/'>
                <Route path='addproduct' element={<Products />}/>
            </Route>
        </Routes>
    </>
  )
}
