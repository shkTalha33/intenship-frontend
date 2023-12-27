import {  Button, Divider, Form, Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  // const host = "https://intenship-deploy.vercel.app/"
  const navigate =  useNavigate()
  const handleFinish = (values) => {
    const { cpassword, ...dataToSend } = values;
    const headers = {
      'ContentType' : 'application/json'
    }
    setLoading(true)
    axios.post(`http://localhost:8000/auth/signup`,dataToSend,{headers})
    .then(res=>{
      const token = res.data.message
       localStorage.setItem("auth-token",token)
       navigate("/")
       message.success("New User SignUp successfully")

    })
    .catch(err=>{
      message.error("Something went wrong while SignUp new user")
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  return (
    <>
        <div className="flex flex-col justify-center bg-[#88c8bc] px-3 md:px-0 items-center h-screen">
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-full  sm:w-3/4 md:w-2/4 lg:w-2/6"
        style={{ margin: '0 auto' }} // Added style to center the form
      >
        <h1 className="text-4xl font-medium text-center mb-4">Sign Up</h1>
        <Divider />
      <Form layout='vertical' onFinish={handleFinish} >
      <Form.Item label="First Name" className="mb-4" name="fname" required={true} rules={[
        {min:3,message:"First Name must be atleast 3 letters"},
        {required:true,message:"Please Enter First Name"}
      ]} hasFeedback>
          <Input
           
            placeholder="Enter your first name" name='fname'
          />
        </Form.Item>
      <Form.Item label="Last Name" className="mb-4" name="lname" required={true} rules={[
        {min:3,message:"Last Name must be atleast 3 letters"},
        {required:true,message:"Please Enter Last Name"}
      ]} hasFeedback>
          <Input
           
            placeholder="Enter your Last name" name='lname'
          />
        </Form.Item>
      <Form.Item label="Email" className="mb-4" name="email" required={true} rules={[
        {type:'email',message:"Please Enter Valid Email"},
        {required:true,message:"Please Enter Email"}
      ]} hasFeedback>
          <Input
           
            placeholder="Enter your username" name='email'
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
        <Form.Item label="Confirm Password" className="mb-4" name="cpassword" required={true} dependencies={['password']} rules={[
        {required:true,message:"Please Enter Confirm Password"},
        ({getFieldValue})=>({
            validator:(_,value)=>{
                if (!value || value === getFieldValue("password")) {
                   return Promise.resolve()
                }else{
                  return Promise.reject("Passwords are not match")
                }
            }
        })
      ]} hasFeedback>
          <Input.Password
            name="cpassword"
            placeholder="Enter your Confirm password"
          />
        </Form.Item>
        <Button  className="text-white mt-4   bg-blue-500 w-full" htmlType="submit"  loading={loading} >
          SignUp
        </Button>
        <p className='font-bold mt-5'> Have an a Account? <Link className='text-blue-600' to="/auth/signin">Sign in</Link> Here.</p>
      </Form>
      </div>
    </div>
    </>
  )
}

