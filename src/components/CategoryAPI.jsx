import axios from 'axios'
import  { useEffect } from 'react'
import { useFilterContext } from '../context/FilterContext';

export default function CategoryAPI({selectedCategory}) {
    const host = "http://localhost:8000/items"
  const { dispatch } = useFilterContext();

    
    useEffect(() => {

        const categoryFilteration = () => {
            axios.get(`${host}/${selectedCategory}`)
            .then(res=>{
              const category = res.data.message
              dispatch({type:"FILTER_ON_CATEGORIES",payload:{category}})
            })
            .catch(err=>{
              console.error(err);
            })
        }

        categoryFilteration()

    }, [selectedCategory])
}
