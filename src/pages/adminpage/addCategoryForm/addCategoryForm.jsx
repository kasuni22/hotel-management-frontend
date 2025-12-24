import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddCategoryForm() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [features, setFeatures] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const newCategory = {
      name,
      price,
      description,
      features: features.split(",").map(f => f.trim()),
      image
    }

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/category", newCategory)
      .then(() => {
        alert("Category added successfully")
        navigate("/admin/categories")
      })
      .catch((err) => {
        console.error(err)
        alert("Failed to add category")
      })
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Category
        </h2>

        {/* Name */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Features */}
        <div className="mb-3">
          <label className="block font-medium mb-1">
            Features (comma separated)
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="AC, WiFi, TV"
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows="3"
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="https://..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  )
}
