import React from 'react'
import AddAndUpdatePage from '../../../components/DashboardCompoenets/AddAndUpdatePage'


export default function AddProducts() {
  return (
    <>
        <AddAndUpdatePage title={"Add Product"} api={"addproduct"} dispatchType={"ADD_NEW_PRODUCT"} messageType={"Added"}  />
    </>
  )
}
