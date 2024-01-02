import axios from "axios";
import React, { useEffect, useReducer, useContext, createContext } from "react";

const productContext = createContext();

export default function ProductContextProvider(props) {
  const initailState = {
    all_products: [],
    loading: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ALL_PRODUCTS":
      //   const updateProducts = action.payload.map((prod)=>{
      //     const productDiscount = ( prod.productPrice * prod.productDiscount ) / 100
      //     const discountedPrice =  prod.productPrice - productDiscount  
      //     return {
      //        ...prod,
      //        discountedPrice : discountedPrice
      //     }
      // })
      // console.log("product at reducer",action.payload)
        return { ...state, all_products: action.payload, loading: false }; 
      default:
      return  state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initailState);

  const fetchProducts = async () => {
    axios
      .get("http://localhost:8000/products/getproducts")
      .then((res) => {
        const products = res.data.message;
        const updateProducts = products.map((prod)=>{
          const productDiscount = ( prod.productPrice * prod.productDiscount ) / 100
          const discountedPrice =  prod.productPrice - productDiscount  
          return {
            ...prod,
            discountedPrice : discountedPrice
          }
      })
      // console.log("updated Products" , updateProducts)
        dispatch({ type: "ALL_PRODUCTS", payload: updateProducts });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <productContext.Provider value={{ ...state, dispatch }}>
        {props.children}
      </productContext.Provider>
    </>
  );
}

export const useProductContext = () => useContext(productContext);
