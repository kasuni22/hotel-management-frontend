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
    alert("Deleting category with name: "+name)

    axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name)
    .then((res)=>{
        setCategoriesIsLoaded(false)
    })
    
}
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Features</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2">${category.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul className="list-disc list-inside">
                    {category.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                   <button onClick={
                    ()=>{
                        deleteItem(category.name)
                    }
                   }
                   className="bg-red-500 text-white px-2 py-1 rounded-lg ml-2">
                    Delete
                    </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
