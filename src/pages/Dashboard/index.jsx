import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './Products'
import Ecommerce from './Ecommerce'
import Tables from './Tables'
import Layout from "../../layout/DefaultLayout"

export default function index() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Ecommerce />} />
                <Route path='tables' element={<Tables />} />
                <Route path='addproduct' element={<Products />}/>
            </Route>
        </Routes>
    </>
  )
}
