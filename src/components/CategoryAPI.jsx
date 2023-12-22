import axios from 'axios'
import  { useEffect } from 'react'
import { useFilterContext } from '../context/FilterContext';

export default function CategoryAPI({selectedCategory,products}) {

  const { dispatch } = useFilterContext();

    
  useEffect(() => {
     if (selectedCategory) {
      const categoryFilteration = () => {
        axios.get(`https://intenship-deploy.vercel.app/items/${selectedCategory}?filterSorting=${products}`)
        .then(res=>{
          const category = res.data.message
          dispatch({type:"FILTER_ON_CATEGORIES",payload:{category}})
        })
        .catch(err=>{
          console.error(err);
        })
    }
    categoryFilteration()
     }
      


    }, [selectedCategory])
}
