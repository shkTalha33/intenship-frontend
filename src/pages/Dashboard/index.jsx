import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './ProductsActions/AddProducts'
import UpdateProduct from './ProductsActions/UpdateProduct'
import Ecommerce from './Ecommerce'
import Products from './Products'
import Layout from "../../layout/DefaultLayout"

export default function index() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Ecommerce />} />
                <Route path='products' element={<Products />} />
                <Route path='products/addproduct' element={<AddProduct />}/>
                <Route path='products/updateproduct/:id' element={<UpdateProduct />}/>
                
            </Route>
        </Routes>
    </>
  )
}
