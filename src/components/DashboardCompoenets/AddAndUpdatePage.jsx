import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Space,
  Upload,
  message,
  Row,
  Col,
  Modal,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../../scss/_add-and-update.scss';

import axios from 'axios';
import Breadcrumb from './Breadcrumb';
import { useProductContext } from '../../context/productContext';
import { useNavigate } from 'react-router-dom';

export default function AddAndUpdatePage({
  title,
  updatedProduct,
  api,
  dispatchType,
  messageType,

}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    if (updatedProduct) {
      form.setFieldsValue({
        productTitle: updatedProduct.productTitle || '',
        productCondition: updatedProduct.productCondition || '',
        productDiscount: updatedProduct.productDiscount || '',
        productPrice: updatedProduct.productPrice || '',
        featuredItem: updatedProduct.featuredItem || false,
      });

      if (updatedProduct.img_url) {
        const fileObj = {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: updatedProduct.img_url,
          thumbUrl: updatedProduct.img_url,
        };
        setFileList([fileObj]);
      }

      if (
        updatedProduct.productSizes &&
        updatedProduct.productSizes.length > 0
      ) {
        const sizes = updatedProduct.productSizes.map((size, index) => ({
          size,
          key: index,
        }));

        form.setFieldsValue({
          productSizes: sizes,
        });
      } else {
        form.setFieldsValue({
          productSizes: [],
        });
      }
    } else {
      form.setFieldsValue({
        productTitle: '',
        productCondition: '',
        productDiscount: '',
        productPrice: '',
        productSizes: [],
        featuredItem: false,
      });
    }
  }, [updatedProduct, form]);

  const { dispatch } = useProductContext();
  const handleFinish = (values) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const ext = fileList[0].name.split('.')[1];

    if (!allowedExtensions.includes(ext)) {
      return message.error('File format must be jpg, png, or jpeg');
    }
    let formData;

    if (!updatedProduct) {
      formData = new FormData();
    
      formData.append('productTitle', values.productTitle);
      formData.append('productCondition', values.productCondition);
      formData.append('productPrice', values.productPrice);
      formData.append('productDiscount', values.productDiscount);
      formData.append('featuredItem', values.featuredItem ? true : false);
    
      // Append productSizes in the desired format
      values.productSizes.forEach((size, index) => {
        formData.append(`productSizes[${index}]`, size.size);
      });
    
      formData.append('file', fileList[0].originFileObj);
    } else {
      formData = values;

      if (formData.productSizes && formData.productSizes.length > 0) {
        formData.productSizes = formData.productSizes.map((size) => size.size);
      }
    }

    const headers = {
      'auth-token': localStorage.getItem('auth-token'),
    };
    setLoading(true);

    const method = updatedProduct ? 'put' : 'post';

    axios[method](
      `${import.meta.env.VITE_APP_BASE_URL}/products/${api}`,
      formData,
      { headers },
    )
      .then((res) => {
        message.success(`Product has been ${messageType} Successfully!`);
        navigate('/dashboard/products');
        dispatch({ type: dispatchType, payload: res.data.message });
      })
      .catch((err) => {
        console.error(err);
        message.error(`Something went wrong while ${messageType} product`);
      })
      .finally(() => {
        setLoading(false);
        form.resetFields();
      });
  };

  const [preview, setPreview] = useState({
    visible: false,
    image: '',
    title: '',
  });

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    setPreview({
      visible: true,
      image: src,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const handleFinishFailed = () => {
    return message.error('Please fill all the feilds correctly');
  };

  return (
    <>
      <div className="  w-full  min-h-screen">
        <Breadcrumb
          destination="Products /"
          location="/products"
          pageName={title}
        />

        <Card className="shadow-xl  border-0 p-5  ">
          <Form
            layout="vertical"
            onFinish={handleFinish}
            form={form}
            onFinishFailed={handleFinishFailed}
          >
            <div className="mb-4 text-center text-3xl md:text-4xl font-semibold">
              {title}
            </div>
            <Divider />
            <Row gutter={64}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="productTitle"
                  label="Title"
                  hasFeedback
                  rules={[
                    { required: true, message: 'Enter Title Of Product' },
                    { min: 3, message: 'Title must be atleast 3 letters' },
                  ]}
                >
                  <Input
                    placeholder="Enter product title"
                    name="productTitle"
                  />
                </Form.Item>

                <Form.Item
                  name="productCondition"
                  label="Condition"
                  hasFeedback
                  rules={[
                    { required: true, message: 'Enter Condition Of Product' },
                  ]}
                >
                  <Input
                    placeholder="Enter product condition"
                    name="productCondition"
                  />
                </Form.Item>
                <Form.Item
                  name="productPrice"
                  label="Price"
                  hasFeedback
                  rules={[
                    { required: true, message: 'Enter Price Of Product' },
                    {
                      pattern: /^[0-9]*$/,
                      message: 'Please enter only numbers',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter product price"
                    name="productPrice"
                  />
                </Form.Item>
                <Form.Item
                  name="productDiscount"
                  label="Discount Percentage"
                  hasFeedback
                  rules={[
                    () => ({
                      validator: (_, value) => {

                        const isNumber = isNaN(value);
                        if (!value.trim()) {
                          return Promise.reject(
                            'Enter Discount Percentage of Product',
                          );
                        } else if (isNumber) {
                          return Promise.reject('Enter only numbers');
                        } else if (value.trim() > 0 && value.trim() < 100) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            'Percentage must be greater than 0 and less than 100',
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <Input
                    placeholder="Enter product Discount Percentage"
                    name="productDiscount"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
              <Form.Item label="Product Sizes" name="productSizes">
  <Form.List name="productSizes">
    {(fields, { add, remove }) => (
      <>
        {fields.length === 0 && (
          <div>
            <Space
              style={{ display: 'flex', marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                name={[0, 'size']}
                fieldKey={[0, 'size']}
                rules={[
                  {
                    required: true,
                    message: 'Please enter a size',
                  },
                ]}
              >
                <Input placeholder="Size" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(0)} />
            </Space>
          </div>
        )}
        {fields.map(({ key, name, fieldKey, ...restField }) => (
          <div key={key}>
            <Space
              style={{ display: 'flex', marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'size']}
                fieldKey={[fieldKey, 'size']}
                rules={[
                  {
                    required: true,
                    message: 'Please enter a size',
                  },
                ]}
              >
                <Input placeholder="Size" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          </div>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            className="w-[50%]"
            onClick={() => add()}
            icon={<PlusOutlined />}
          >
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
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      console.log(e);
                      return e;
                    }
                    const fileList = e && e.fileList;
                    return fileList;
                  }}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (fileList && fileList.length > 0) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Please Upload Image');
                        }
                      },
                    },
                  ]}
                >
                  <Upload
                    name="file"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length ? null : '+ Upload'}
                  </Upload>
                  <Modal
                  centered={true}
                    open={preview.visible}
                    title={preview.title}
                    footer={null}
                    onCancel={() => setPreview({ ...preview, visible: false })}
                  >
                    <img
                      alt="example"
                      style={{ width: '100%',maxHeight:"400px" }}
                      src={preview.image}
                    />
                  </Modal>
                </Form.Item>

                <Form.Item name="featuredItem" valuePropName="checked">
                  <Checkbox>Featured Item</Checkbox>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} className="m-auto">
                <Form.Item className="text-center mb-5 mt-9">
                  <Button
                    htmlType="submit"
                    type="text"
                    className=" text-white w-[66%] hover:text-white"
                    style={{ background: '#7678ed', color: 'white' }}
                    disabled={loading}
                    loading={loading}
                  >
                    {title}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}
