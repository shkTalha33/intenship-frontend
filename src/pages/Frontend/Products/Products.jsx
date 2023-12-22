import {  Input, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import ProductSizes from '../../../components/ProductSizes'
import { useFilterContext } from '../../../context/FilterContext'
import axios from 'axios'
import CategoryAPI from '../../../components/CategoryAPI'



export default function Product() {
  const { filter_products, loading, dispatch } = useFilterContext();
  const [searchterm, setSearchterm] = useState("");
  const [category, setCategory] = useState('olddate');


  const handleCategory = (value) => {
     setCategory(value);
  };

  useEffect(() => {
    if (setCategory !== "" || null) {
      const searchProducts = () => {
        axios
          .get(`https://intenship-deploy.vercel.app/items/searchbar?term=${searchterm}`)
          .then((res) => {
            const searchBar = res.data.message;
            dispatch({ type: 'FILTER_ON_SEARCH', payload: { searchBar } });
          })
          .catch((err) => {
            console.log(err);
          });
    };

    searchProducts();
    }
  }, [searchterm]);

  return (
    <>
      {!filter_products ? (
        <Spin spinning={loading} className='h-full w-full flex items-centerjustify-center' size="large" />
      ) : (
        <>
          <div className="upper-side md:flex justify-between items-center w-5/6 mx-auto py-10 md:py-20">
            <div className="search-section my-7 md:my-0 md:w-1/5">
              <Input.Search
                value={searchterm}
                onChange={(e) => {
                  setSearchterm(e.target.value);
                }}
                placeholder="Search Here..."
              />
            </div>
            <div className="total-products md:w-3/5 text-center text-2xl hidden md:block">
              Total Products {filter_products && filter_products.length}
            </div>
            <div className="filteration-section text-xl md:w-1/5">
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
          </div>
          <div className="sidebar md:flex w-5/6 mx-auto">
            <div className="sizes-filteration md:w-[30%] lg:w-1/5 ">
              <div className="sizes-box border flex items-center justify-evenly flex-wrap w-full px-4 py-6">
                <ProductSizes />
              </div>
            </div>
            <div className="all-products md:w-[70%] lg:w-4/5">
              <div className="sizes-box sm:flex justify-around items-center flex-wrap ">
                {filter_products.length < 1 ? (
                  <div className="no-product text-center text-4xl">
                    No Products To Show
                  </div>
                ) : (
                  <ProductCard products={filter_products} />
                )}
              </div>
            </div>
          </div>
          <CategoryAPI selectedCategory={category} products={filter_products}  />
        </>
      )}
    </>
  );
}


