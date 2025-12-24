import axios from "axios";
import React, { useState, useEffect } from "react";
  
export default function CategoriesPage() {

  const [categories, setCategories] = useState([])
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false)

  useEffect(
    () => {
        if(!categoriesIsLoaded){
      axios.get(import.meta.env.VITE_BACKEND_URL+"/api/category")
      .then((res)=>{
        setCategories(res.data.categories)
        setCategoriesIsLoaded(true)
      })
    }
    
  },[categoriesIsLoaded]
)

function deleteItem(name){
    
    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name, {
      headers: {
        Authorization: "Bearer " +localStorage.getItem
        ("token")
      }
    })
    .then((res)=>{
        setCategoriesIsLoaded(false)
    })
    
}}
