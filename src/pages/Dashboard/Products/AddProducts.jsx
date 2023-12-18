import { Button, Card, Checkbox, Divider, Form, Input,Space,Typography, Upload, message } from 'antd'
import React, { useState } from 'react'
import { MinusCircleOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';

import axios from "axios"

export default function ListItems() {
  const [form] = Form.useForm();
    const host = "http://localhost:8000"
    const [fileList, setFileList] = useState("")	
    const [loading, setLoading] = useState(false)	
   
const handleFinish = (values) => {
  const formData = new FormData();

  formData.append("productTitle", values.productTitle);
  formData.append("productCondition", values.productCondition);
  formData.append("productPrice", values.productPrice);
  formData.append("productDiscount", values.productDiscount);
  formData.append("featuredItem", values.featuredItem ? true : false);
  
  values.productSizes.map((size, index) => {
    formData.append(`productSizes[${index}]`, size.size);
  });

  formData.append("file", values.file[0].originFileObj);


  const headers = {
    "auth-token": localStorage.getItem("auth-token"),
  };
  setLoading(true)

  axios
    .post(`${host}/products/addproduct`, formData, { headers })
    .then((res) => {
      console.log(res.data);
      message.success("Product has been successfully added!")

    })
    .catch((err) => {
      console.error(err);
      message.error("Something went wrong while adding product")
    })
    .finally(()=>{
      setLoading(false)
      form.resetFields()
    })
};


//  const beforeUpload = (file) => {
//   setFileList([file]);
//   return false;
// };
  

  return (
    <>
       <div className=" flex flex-col w-full py-9 justify-center items-center min-h-screen bg-[#88c8bc]">
         <Card className='shadow-xl w-5/6 md:w-1/2 border-0 p-5 my-20 '>
         <Form layout='vertical' onFinish={handleFinish} form={form}>
            <Typography.Title level={1} className='mb-4 text-center'>Add Product</Typography.Title>
            <Divider />
            <Form.Item name="productTitle" label="Title" hasFeedback rules={[
                {required:true,message:"Enter Title Of Product"},
                {min:3,message:"Title must be atleast 3 letters"}
            ]} >
                <Input placeholder='Enter product title' name='productTitle' />
            </Form.Item>
           
            <Form.Item name="productCondition" label="Condition" hasFeedback rules={[
                {required:true,message:"Enter Condition Of Product"},
            ]} >
                <Input placeholder='Enter product condition' name='productCondition' />
            </Form.Item>
            <Form.Item name="productPrice" label="Price" hasFeedback rules={[
                {required:true,message:"Enter Price Of Product"},
                {
                    pattern: /^[0-9]*$/,
                    message: 'Please enter only numbers',
                  },
                 
            ]} >
                <Input  placeholder='Enter product price' name='productPrice' />
            </Form.Item>
            <Form.Item name="productDiscount" label="Discount Percentage" hasFeedback rules={[
              
                ()=>({
                    validator:(_,value)=>{
                        const isNumber = isNaN(value)
                        if (!value.trim()) {
                            return Promise.reject("Enter Discount Percentage of Product")
                        }
                       else if ( isNumber) {
                            return Promise.reject("Enter only numbers")
                        }
                       else if(  value.trim() > 0 && value.trim() < 100) {
                            return Promise.resolve()
                        }else{
                            return Promise.reject("Percentage must be greater than 0 and less than 100")
                        }
                    }
                })
                 
            ]} >
                <Input  placeholder='Enter product Discount Percentage' name='productDiscount' />
            </Form.Item>
            <Form.Item label="Product Sizes" name="productSizes" hasFeedback rules={[{required:true,message:"Add atleast 1 size of product"}]}>
             <Form.List name="productSizes">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'size']}
                  fieldKey={[fieldKey, 'size']}
                  rules={[{ required: true, message: 'Please enter a size' }]}
                >
                  <Input placeholder="Size" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed"  onClick={() => add()} icon={<PlusOutlined />}>
                Add Size
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
             </Form.Item>
            <Form.Item
            name="file"
            label="Product Image"
            valuePropName="fileList"
            
            getValueFromEvent={(e) => e.fileList}
            rules={[
              { required: true, message: 'Choose Image of Product' },
            ]}
          >
            <Upload  name='file'   fileList={fileList}>
              <Button type='file' name='file' className='bg-blue-500 text-white hover:bg-blue-600  ' icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="featuredItem" valuePropName="checked">
            <Checkbox>Featured Item</Checkbox>
          </Form.Item>
            <Form.Item className='text-center mb-5 mt-9'>
               <Button htmlType='submit' className='bg-blue-700 text-white w-1/2 ' disabled={loading} loading={loading}>Add Product</Button>
            </Form.Item>
         </Form>
         </Card>
       </div>
    </>
  )
}



