import {  Input, Select, Spin ,Drawer,Space,Button} from 'antd'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import ProductSizes from '../../../components/ProductSizes'
import { useFilterContext } from '../../../context/FilterContext'
import axios from 'axios'
import CategoryAPI from '../../../components/CategoryAPI'
import { FaFilter } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./_product.scss"


export default function Product() {
  const { filter_products,  dispatch } = useFilterContext();
  const [searchterm, setSearchterm] = useState("");
  const [category, setCategory] = useState('olddate');
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);



  const handleCloseDrawer = () => {
    setOpenFilterDrawer(false);
  };

  const handleCategory = (value) => {
     setCategory(value);
     setOpenFilterDrawer(false)
  };

  useEffect(() => {
    if (setCategory !== "" || null) {
      const searchProducts = () => {
        axios
          .get(`${import.meta.env.VITE_APP_BASE_URL}/items/searchbar?term=${searchterm}`)
          .then((res) => {
            const searchBar = res.data.message;
            dispatch({ type: 'FILTER_ON_SEARCH', payload: { searchBar } });
          })
          .catch((err) => {
            console.log(err);
          })
    };

    searchProducts();
    }
  }, [searchterm]);

  return (
    <>
    
        <div className='min-h-[100vh]'>
          <div className="upper-side  flex justify-between items-center w-5/6 mx-auto py-10 md:py-20">
            <div className=" hidden md:block search-section my-7 md:my-0 md:w-1/5">
              <Input.Search
                value={searchterm}
                onChange={(e) => {
                  setSearchterm(e.target.value);
                }}
                placeholder="Search Here..."
              />
            </div>
            <div  className="total-products md:w-3/5 text-center text-boxdark text-2xl md:text-3xl  font-bold">
              Total Products {filter_products && filter_products.length}
            </div>
            <div className=" hidden md:block filteration-section text-xl md:w-1/5">
              <Select
                className="w-[100%] text-lg"
                onChange={handleCategory}
                placeholder="Filter Products"
              >
                <Select.Option  value="a-ztitle"  >Title: A-Z</Select.Option>
                <Select.Option  value="z-atitle"  >Title: Z-A</Select.Option>
                <Select.Option  value="getminprice"  >Price: Low to High</Select.Option>
                <Select.Option  value="getmaxprice"  >Price: High to low</Select.Option>
                <Select.Option  value="newdate"  >Date: New to Old</Select.Option>
                <Select.Option  value="olddate"  >Date: Old to New</Select.Option>
                <Select.Option  value="hightolowdiscount"  >Discount: High to Low</Select.Option>
                <Select.Option  value="featured"  >Featured Item</Select.Option>
              </Select>
            </div>
            <div className="filter-icon block md:hidden" style={{color:"#595959"}} onClick={()=>setOpenFilterDrawer(!openFilterDrawer)}>
               {<FaFilter color='#344e41' />}
            </div>
          </div>
          <div className="sidebar md:flex w-5/6 mx-auto">
            <div className="hidden md:block sizes-filteration md:w-[30%] lg:w-1/5 ">
              <div className="sizes-box  flex items-center justify-evenly flex-wrap w-full px-4 py-6" style={{border:"1px solid #ffd6ff"}}>
                <ProductSizes />
              </div>
            </div>
            <div className="all-products md:w-[70%] lg:w-4/5">
              <div className="sizes-box sm:flex justify-around items-center flex-wrap ">
                {!filter_products.length  ? (
                  <div className="no-product text-center text-boxdark text-4xl">
                      <h1>No Products To Show</h1>
                  </div>
                ) : (
                  <ProductCard products={filter_products} />
                )}
              </div>
            </div>
          </div>
          {filter_products && <CategoryAPI selectedCategory={category} products={filter_products}  />}
        </div>

        <Drawer
    
        title={` Filteration`}
        placement="right"
        onClose={handleCloseDrawer}
        closeIcon= {null}
        open={openFilterDrawer}
        extra={
          <Space>
            <Button type="text" onClick={handleCloseDrawer} icon={<IoCloseSharp style={{border:"none",fontSize:20,color:"gray"}} />} />
          </Space>
        }
      >
      <>
      <div className="  search-section mb-7 md:my-0 md:w-1/5">
              <Input.Search
                value={searchterm}
                onSearch={handleCloseDrawer}
                onChange={(e) => {
                  setSearchterm(e.target.value);
                }}
                placeholder="Search Here..."
              />
            </div>
      <div className="  filteration-section text-xl md:w-1/5">
              <Select
                className="w-[100%] text-lg"
                onChange={handleCategory}
                placeholder="Filter Products"
              >
                <Select.Option  value="a-ztitle"  >Title: A-Z</Select.Option>
                <Select.Option  value="z-atitle"  >Title: Z-A</Select.Option>
                <Select.Option  value="getminprice"  >Price: Low to High</Select.Option>
                <Select.Option  value="getmaxprice"  >Price: High to low</Select.Option>
                <Select.Option  value="newdate"  >Date: New to Old</Select.Option>
                <Select.Option  value="olddate"  >Date: Old to New</Select.Option>
                <Select.Option  value="hightolowdiscount"  >Discount: High to Low</Select.Option>
                <Select.Option  value="featured"  >Featured Item</Select.Option>
              </Select>
        </div>
        <div className="sizes-filteration mt-5 md:w-[30%] lg:w-1/5 ">
              <div className="sizes-box  flex items-center justify-evenly flex-wrap w-full px-4 py-6" style={{border:"1px solid #ffd6ff"}}>
                <ProductSizes />
              </div>
            </div>
      
      </>
      </Drawer>
    </>
  );
}


