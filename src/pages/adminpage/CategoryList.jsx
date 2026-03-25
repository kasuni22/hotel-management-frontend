import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((res) => {
        setCategories(res.data.categories)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError("Failed to fetch categories")
        setLoading(false)
      })
  }

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return
    }

    const token = localStorage.getItem("token")
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + `/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Category deleted successfully")
        fetchCategories()
      })
      .catch((err) => {
        console.log(err)
        alert("Error deleting category")
      })
  }

  if (loading) {
    return <div className="text-center mt-10 font-semibold">Loading Categories...</div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 font-bold">{error}</div>
  }

  function handlePlusClik() {
    navigate("/admin/add-category")
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-5">Category List</h1>

      <button className="bg-[#C9A86C] text-[#3D1C3A] w-[60px] h-[60px] rounded-full text-2xl text-center flex justify-center items-center fixed bottom-5 right-5 shadow-lg hover:scale-105 transition"
        onClick={() => {
          handlePlusClik()
        }}>
        <FaPlus color="white" />

      </button>

      <table className="w-full border border-gray-400">
        <thead className="bg-[#3D1C3A] text-[#F0E6D3]">
          <tr>
            <th className="border border-[#6B3F68] p-2">#</th>
            <th className="border border-[#6B3F68] p-2">Name</th>
            <th className="border border-[#6B3F68] p-2">Price</th>
            <th className="border border-[#6B3F68] p-2">Features</th>
            <th className="border border-[#6B3F68] p-2">Description</th>
            <th className="border border-[#6B3F68] p-2">Image</th>
            <th className="border border-[#6B3F68] p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">Rs. {category.price}</td>
              <td className="border p-2">
                {category.features?.join(", ")}
              </td>
              <td className="border p-2">{category.description}</td>
              <td className="border p-2">
                {category.image ? (
                  <img
                    src={category.image}
                    alt="category"
                    className="w-20 h-16 object-cover mx-auto"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border p-2">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => navigate(`/admin/categories/edit/${category._id}`)}
                    className="bg-[#C9A86C] text-[#3D1C3A] p-2 rounded shadow hover:bg-opacity-80 transition"
                  >
                    <FaEdit />
                  </button>


                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-[#6B3F68] text-[#F0E6D3] p-2 rounded shadow hover:bg-opacity-80 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
