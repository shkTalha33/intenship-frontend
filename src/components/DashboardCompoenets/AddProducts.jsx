import React from 'react';
import { Form, Input, Select, Checkbox, Upload, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductForm = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
    // Add your form submission logic here
  };

  return (
    <Form
      name="productForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        {/* Left side - Product details */}
        <Col span={12}>
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: 'Please enter the product name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Product Category"
            name="productCategory"
            rules={[{ required: true, message: 'Please select the product category!' }]}
          >
            <Select>
              {/* Add your product categories as Option components */}
              <Option value="category1">Category 1</Option>
              <Option value="category2">Category 2</Option>
              {/* Add more categories as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: 'Please enter the brand!' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Right side - Product image and sizes */}
        <Col span={12}>
          <Form.Item
            label="Product Image"
            name="productImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload the product image!' }]}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          {/* You can use a dynamic form field for sizes */}
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Form.Item
                    key={key}
                    label={key === 0 ? 'Sizes' : ''}
                    {...restField}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name={[name, 'size']}
                        fieldKey={[fieldKey, 'size']}
                        rules={[{ required: true, message: 'Please enter the size!' }]}
                      >
                        <Input placeholder="Size" style={{ width: '60%' }} />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'quantity']}
                        fieldKey={[fieldKey, 'quantity']}
                        rules={[{ required: true, message: 'Please enter the quantity!' }]}
                      >
                        <Input placeholder="Quantity" style={{ width: '40%' }} />
                      </Form.Item>
                    </Input.Group>
                    {fields.length > 1 && (
                      <Button danger onClick={() => remove(name)}>
                        Remove Size
                      </Button>
                    )}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} icon={<UploadOutlined />}>
                    Add Size
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item name="featured" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Featured Item</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;

