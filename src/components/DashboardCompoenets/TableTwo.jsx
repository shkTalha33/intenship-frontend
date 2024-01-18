import { useEffect, useState } from 'react';
import {Table,Image,Space,Button,Tooltip} from  "antd"
import  axios  from 'axios';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TableTwo = () => {

  const [totalProducts, setTotalProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const allProducts = () =>{
      axios.get(`${import.meta.env.VITE_APP_BASE_URL}/products/getproducts`)
      .then(res=>{
        setTotalProducts(res.data.message)
      })
      .catch(err=>{
        console.error(err);
      })
      .finally(()=>{
        setLoading(false)
      })
  }

  console.log(totalProducts)
  useEffect(() => {
     allProducts()
  }, [])
  
  const dataSource = totalProducts.map(product => ({
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
        <Image src={text} alt={record.productName} width={60} className=' rounded-full' />
       </>
      ),},

      {title:"Title",dataIndex:"productTitle",key:"title",
       render:text=><span style={{color:"#40916c", whiteSpace:"nowrap" }}>{text}</span>
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
        render: () => (
          <Space direction='horizontal'>
             <Tooltip title="Delete" >
               <Button type='text'   icon={<MdDelete color='red' size={23} />}/>
             </Tooltip>
             <Tooltip title="Edit" >
               <Button type='text'   icon={<FaEdit style={{color:"#072ac8"}} size={23} />}/>
             </Tooltip>
          </Space>
        ),
      },
     
   ]

     
   
    return (
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black  dark:text-white text-center">
            All Products
          </h4>
        </div>
           <div className="">
            <div className="overflow-x-auto ">
              <Table className='text-black dark:text-white' columns={columns} dataSource={dataSource} loading={loading} pagination={false}></Table>
            </div>
           </div>
      </div>
    );
  };
  
  export default TableTwo;
  