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
        dispatch({ type: "ALL_PRODUCTS", payload: products });
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
