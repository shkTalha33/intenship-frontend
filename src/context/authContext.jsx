import { message } from 'antd';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';

const authContext = createContext()

export default function authContextProvider(props) {

const navigate = useNavigate()

    const initailState = {
        auth:false,
        user:{}
    }

 
    

    const reducer = (state,action) => {
         switch (action.type) {
            case "SET_USER":
                return {...state,auth:true, user:action.payload}
           case "SET_LOGGED_IN": 
                return {...state,auth:true}
           case "SET_LOGGED_OUT": 
                return {...state,auth:false,user:{}}
            default:
                state;
         }
    }


    const [state, dispatch] = useReducer(reducer,initailState)


    useEffect(() => {
        const token = localStorage.getItem("auth-token")
         if (token) {
            const headers={
                'auth-token':token
            }
           axios.get("http://localhost:8000/auth/getuser",{headers})
           .then((res)=>{
            const user =  res.data.message[0]
               dispatch({type:"SET_USER",payload:user})
          })
         .catch (error=> {
          console.error(error);
            // message.error("Something went wrong while login")
        })
    }
      
    }, [])
    

  return (
     <authContext.Provider value={{...state,dispatch}}>
        {props.children}
     </authContext.Provider>
  )
}

 export const useAuthContext = () => useContext(authContext)
