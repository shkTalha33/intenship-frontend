import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useProductContext } from './productContext'

const filterContext = createContext()

export default function FilterContextProvider(props) {
    const {all_products,loading} = useProductContext()


    const initailState = {
        products:[],
        filter_products:[],
        loading:true,
        filter:{
            sizes:[],
            searchBar:"",
            category:[]
        }
    }

    const reducer = (state,action) => {
        switch (action.type) {
            case "SET_PRODUCTS":
             return {
                      ...state,
                      products:action.payload,
                      filter_products:action.payload,
                      loading:action.loading
                   }
            case "FILTRATION_ON_SIZES":

                return {
                    ...state,
                    filter_products:action.payload.sizes
                }

           case "FILTER_ON_SEARCH" :
            
            return{
                ...state,
                filter_products:action.payload.searchBar
            }

            case "FILTER_ON_CATEGORIES":
                
                return {
                    ...state,
                    filter_products:action.payload.category
                }
               
            default:
              return state;
        }
    }

    const [state, dispatch] = useReducer(reducer,initailState)


    useEffect(() => {
        const getProducts = () => {
                dispatch({type:"SET_PRODUCTS",payload:all_products,loading:loading})
        }

       getProducts()
    }, [all_products])
    

  return (
    <>
       <filterContext.Provider value={{...state,dispatch}}>
         {props.children}
       </filterContext.Provider>
    </>
  )
}

export const useFilterContext = () => useContext(filterContext)
