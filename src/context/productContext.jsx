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
        return { ...state, all_products: action.payload, loading: false }; 
      case "ADD_NEW_PRODUCT":
        return { ...state, all_products: [...state.all_products,action.payload]}; 
      case "DELETE_PRODUCT":
        const deletedProduct = state.all_products.filter(pro=> pro._id !== action.payload)
         return {
          ...state,
          all_products:deletedProduct
         }
      case "UPDATE_PRODUCT":
        const updatedProduct = state.all_products.map((pro)=>{
          return pro._id === action.payload._id ? { ...pro, ...action.payload } : pro;
        })
        console.log(updatedProduct)
         return {
          ...state,
          all_products:updatedProduct
         }
      default:
      return  state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initailState);

  const fetchProducts = async () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASE_URL}/products/getproducts`)
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
