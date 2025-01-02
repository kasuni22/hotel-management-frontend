export default function CategoryList() {
  // Sample category data matching category.js schema
  const categories = [
      {
          id: 1,
          name: "Luxury Suite",
          price: 250,
          features: ["King bed", "Balcony", "Jacuzzi"],
          description: "High-end rooms with premium amenities",
          image: "https://example.com/luxury-suite.jpg"
      },
      {
          id: 2,
          name: "Normal Room",
          price: 120,
          features: ["Queen bed", "City view"],
          description: "Standard comfortable rooms",
          image: "https://example.com/normal-room.jpg"
      },
      {
          id: 3,
          name: "Low Cost",
          price: 60,
          features: ["Single bed"],
          description: "Budget-friendly accommodations",
          image: "https://example.com/low-cost.jpg"
      }
  ];

  return (
      <div className="w-full">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Room Categories</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Add New Category
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                      <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category Name</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Features</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                      {categories.map((category) => (
                          <tr key={category.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm font-medium text-gray-800">{category.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">${category.price}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{category.features.join(", ")}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">
                                  <img src={category.image} alt={category.name} className="h-12 w-12 object-cover rounded" />
                              </td>
                              <td className="px-6 py-4 text-sm">
                                  <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                                  <button className="text-red-600 hover:text-red-800">Delete</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}
