import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import Header from '../../components/Header'
import Footer from '../../components/Footer/Footer'
import ProductPage from './ProductPage'
import Cart from './Cart'
import PrivateRoute from "../../confidentail/privateRoute"


export default function index() {
  return (
    <>
    <Header />
       <Routes>
          <Route path='/'>
             <Route index element={<Home />} />
             <Route path='products' element={<Products />} />
             <Route path='products' element={<Products />} />
             <Route path='productpage/:id' element={<ProductPage />} />
             <Route path='cart' element={<PrivateRoute Component={Cart} /> } />
          </Route>
       </Routes>
       <Footer />
    </>
  )
}
