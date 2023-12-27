import React, { createContext, useContext } from "react";
import { useReducer } from "react";

const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const getCartProdcuts = () => {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    if (cartProducts === null || cartProducts === undefined) {
      cartProducts = [];
    }
    return cartProducts;
  };

  const initailState = {
    cart: getCartProdcuts(),
  };

  const setCartProducts = (products) => {
    localStorage.setItem("cartProducts", JSON.stringify(products));
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        let newProduct = { ...action.payload, quantity: 1 };

        const isProductAlreadyCart = state.cart.find(prod => prod._id === newProduct._id );
        if (isProductAlreadyCart !== undefined) {
            const existingProduct = state.cart.map(prod => {
                 return prod._id === isProductAlreadyCart._id ? {...prod,quantity: prod.quantity + 1} : prod
            })
            setCartProducts(existingProduct);
            return {
               ...state,
               cart: existingProduct
            }
           
        }
        
           const newCartProducts = [...state.cart, newProduct];
           setCartProducts(newCartProducts);
           return { ...state, cart: newCartProducts };

       case "SET_INCREMENT":
         

         return {
          ...state,
          cart: state.cart.map(prod=>{
             return prod._id === action.payload && prod.quantity < 10 ? {...prod,quantity:prod.quantity + 1} : prod
          })
         }
       case "SET_DECREMENT":
        return {
          ...state,
          cart:state.cart.map(prod=>{
            return  prod._id === action.payload && prod.quantity > 1 ? {...prod,quantity:prod.quantity - 1} : prod
          })
         }

         case "DELETE_CART_PRODUCT":
           const deleteItem = state.cart.filter(prod=>{
              return prod._id !== action.payload
           })

           setCartProducts(deleteItem)

           return{
               ...state,
               cart:deleteItem
           }

           case "CLEAR_CART_PRODUCTS":
             localStorage.removeItem("cartProducts")
             return {
               ...state,
               cart: []
             }


      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initailState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <cartContext.Provider value={{ ...state, dispatch, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCartContext = () => useContext(cartContext);
