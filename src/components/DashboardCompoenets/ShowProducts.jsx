import { useEffect, useState } from 'react';
import {Table,Image,Space,Button,Tooltip,message,Modal} from  "antd"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link , useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/productContext';
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios"

const ShowProducts = () => {

  const navigate = useNavigate()

  const {all_products,dispatch} = useProductContext()

  const [totalProducts, setTotalProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const handleDelete = (id) => {
    Modal.confirm({
      maskClosable: true,
      centered: true,
      title: "Are you sure to delete the product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "default",
      cancelText: "No",
      onOk:()=>{handleOk(id)}
    });
  };
  const handleOk = (id) => {
    const headers = {
      'Content-Type': 'application/json'
   }
     axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/products/deleteproduct/${id}`,{headers})
     .then(res=>{
         message.success(res.data.message)
         dispatch({type:"DELETE_PRODUCT",payload:id})
     })
     .catch(res=>{
      message.error(res.data.message)
     })
  }

  const handleProductPage = (key) => {
    navigate(`/productpage/${key}`)
  }
 

  useEffect(() => {
    setTotalProducts(all_products)
    setLoading(false)
  }, [all_products])
  
  const dataSource =  totalProducts.map(product => ({
    key: product._id,
    productTitle: product.productTitle,
    productCondition: product.productCondition,
    productPrice: product.productPrice,
    productDiscount: product.productDiscount,
    image: product.img_url,
  }));
  
   const columns = [
      {title:"Product",dataIndex:"image", key: 'image',
      render: (text, record) => (
       <>
        <Image src={text} alt={record.productName} width={60} className=' rounded-[999px]' />
       </>
      ),},

      {title:"Title",dataIndex:"productTitle",key:"title",
       render:(text,record)=><span className='cursor-pointer' style={{color:"#40916c", whiteSpace:"nowrap" }} onClick={() => handleProductPage(record.key)}>{text}</span>
      },
      {title:"Condition",dataIndex:"productCondition",key:"Condition",
      render: text => <span style={{fontWeight:"bold"}}>${text}</span>,
      },
      {
        title: 'Price',
        dataIndex: 'productPrice',
        key: 'price',
        render: text => <span style={{fontWeight:"bold"}}>${text}</span>,
      },
      {
        title: 'Discount',
        dataIndex: 'productDiscount',
        key: 'discount',
        render: text => <span  style={{color:"#74c69d",fontWeight:"bold"}}>{`${text}%`}</span>,
      },
      {
        title: 'Action',
        key: 'editAndDelete',
        render: ({key}) => (
          <Space direction='horizontal'>
             <Tooltip title="Delete" >
               <Button type='text'   icon={<MdDelete color='red' size={23} />}  onClick={()=>handleDelete(key)}/>
             </Tooltip>
             <Tooltip title="Edit" >
                <Link to={`updateproduct/${key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
             <Button type='text' icon={<FaEdit style={{ color: "#072ac8" }} size={23} />} >
             </Button>
                </Link>
             </Tooltip>
          </Space>
        ),
      },
     
   ]

     
   
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
          <h4 className="text-xl font-semibold text-black  dark:text-white text-center">
            All Products
          </h4>
          <Link to="/dashboard/products/addproduct">
          <Button  type='dashed' icon={<FaPlus />} className='text-black  dark:text-white' > Add Products </Button>
          </Link>
        </div>
           <div className="">
            <div className="overflow-x-auto ">          
                 <Table className='text-black dark:text-white' columns={columns} dataSource={dataSource} loading={loading} 
                 pagination={false}></Table>
            </div>
           </div>
      </div>
    );
  };
  
  export default ShowProducts;
  