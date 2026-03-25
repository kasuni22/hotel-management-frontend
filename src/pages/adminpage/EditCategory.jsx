import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaSave } from "react-icons/fa"

export default function EditCategory() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    name: "",
    price: "",
    features: "",
    description: "",
    image: ""
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("No authentication token found.")
      setIsLoading(false)
      return
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const c = res.data.category
        setForm({
          name: c.name,
          price: c.price,
          features: c.features?.join(", "),
          description: c.description,
          image: c.image
        })
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to load category data.")
        setIsLoading(false)
      })
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Authentication error: No login token found.")
      return
    }

    axios
      .put(import.meta.env.VITE_BACKEND_URL + `/api/category/${id}`, {
        ...form,
        features: form.features.split(",").map(f => f.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Category updated successfully")
        navigate("/admin/categories")
      })
      .catch((err) => {
        console.error(err)
        alert("Failed to update category")
      })
  }

  if (isLoading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Category Data...</div>
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600 font-bold">{error}</div>
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-10 bg-gray-100">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-[#3D1C3A] mb-6">
          ✏️ Edit Category
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C9A86C] outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Price (Rs)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C9A86C] outline-none"
            />
          </div>

          {/* Features */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Features (comma separated)
            </label>
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="AC, WiFi, TV"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C9A86C] outline-none"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C9A86C] outline-none"
            />
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#C9A86C] outline-none"
            />

            {/* Image Preview */}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-4 h-40 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#3D1C3A] text-[#C9A86C] hover:opacity-80 px-6 py-2 rounded-lg font-semibold transition"
            >
              <FaSave />
              Update Category
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
