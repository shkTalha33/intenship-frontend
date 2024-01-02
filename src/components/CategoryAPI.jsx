import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useFilterContext } from '../context/FilterContext';

export default function CategoryAPI({selectedCategory}) {

  const { dispatch } = useFilterContext();

  const [apiLoading, setApiLoading] = useState(false)

    
  useEffect(() => {
     if (selectedCategory) {
     
      const categoryFilteration = () => {
        setApiLoading(true)

        axios.get(`${import.meta.env.VITE_APP_BASE_URL}/items/${selectedCategory}`)
        .then(res=>{
          const category = res.data.message
          setApiLoading(false)
          dispatch({type:"FILTER_ON_CATEGORIES",payload:{category},loading:apiLoading})
        })
        .catch(err=>{
          console.error(err);
        })
    }
    categoryFilteration()
     }
      


    }, [selectedCategory])
}
