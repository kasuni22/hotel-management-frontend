export default function CategoryList() {
    // Sample category data 
    const categories = [
      {
        id: 1,
        name: "Luxury Suite",
        description: "High-end rooms with premium amenities",
        numberOfRooms: 10,
        priceRange: "$200-$300"
      },
      {
        id: 2,
        name: "Normal Room",
        description: "Standard comfortable rooms",
        numberOfRooms: 15,
        priceRange: "$100-$150"
      },
      {
        id: 3,
        name: "Low Cost",
        description: "Budget-friendly accommodations",
        numberOfRooms: 20,
        priceRange: "$50-$80"
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Number of Rooms</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Price Range</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{category.numberOfRooms}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{category.priceRange}</td>
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