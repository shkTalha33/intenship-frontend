import {  Button, Divider, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/authContext'
import AuthAnimation from '../../../components/AuthAnimation'

export default function SignIn() {

const {dispatch}  = useAuthContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const handleFinish = (values) => {
    
    const headers = {
      'Content-Type': 'application/json'
   }
        setLoading(true)
        axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/signin`,values,{headers})
        .then((res)=>{
          const token = res.data.message
          navigate("/")
          dispatch({type:"SET_LOGGED_IN"})
          localStorage.setItem("auth-token",token)
          message.success("Login successfully")
        })
       .catch (error=> {
        console.error(error);
          message.error("Something went wrong while login")
      })
      .finally(()=>{
        setLoading(false)
      })
  }
  return (
    <AuthAnimation>
        <div className="flex flex-col justify-center   items-center h-screen">
      <div
        className="bg-white p-8 rounded-lg md:shadow-2xl w-full  sm:w-3/4 md:w-2/4 lg:w-1/4"
        style={{ margin: '0 auto' }} // Added style to center the form
      >
        <h1 className="text-3xl font-medium text-center mb-4">Sign In</h1>
        <Divider />
      <Form layout='vertical' onFinish={handleFinish} >
      <Form.Item label="Email" className="mb-4" name="email" required={true} rules={[
        {type:'email',message:"Please Enter Valid Email"},
        {required:true,message:"Please Enter Email"}
      ]} hasFeedback>
          <Input
           
            placeholder="Enter your email" name='email'
          />
        </Form.Item>
        <Form.Item label="Password" className="mb-4" name="password" required={true} rules={[
        {required:true,message:"Please Enter Password"}
      ]} hasFeedback>
          <Input.Password
            name="password"
            placeholder="Enter your password"
          />
        </Form.Item>
        <Button type='submit'  className="text-white mt-4  w-full" htmlType="submit"  loading={loading}  style={{background:"#00b4d8"}}>
          SignIn
        </Button>
        <p className='font-bold mt-5'>Don't Have an Account? <Link className='underline' style={{color:"#00b4d8"}} to="/auth/signup">Sign Up</Link> Here.</p>
      </Form>
      </div>
    </div>
    </AuthAnimation>
  )
}
