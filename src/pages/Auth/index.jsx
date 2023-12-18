import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Route, Routes } from 'react-router-dom'

export default function index() {
  return (
    <>
       <Routes>
          <Route path="/">
             <Route path="signin" element={<SignIn />} />
             <Route path="signup" element={<SignUp />} />
          </Route>
       </Routes>
    </>
  )
}
