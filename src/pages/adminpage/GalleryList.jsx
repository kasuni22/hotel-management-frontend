export default function GalleryList() {
  
  const images = [
      {
          id: 1,
          name: "Luxury Suite View",
          image: "https://example.com/luxury-suite.jpg",
          description: "A beautiful view of our luxury suite."
      },
      {
          id: 2,
          name: "Pool Area",
          image: "https://example.com/pool-area.jpg",
          description: "Relax at our state-of-the-art pool area."
      }
  ];

  return (
      <div className="w-full">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Image Gallery</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                  Upload New Image
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                      <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                      {images.map((image) => (
                          <tr key={image.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm text-gray-800">
                                  <img src={image.image} alt={image.name} className="h-12 w-12 object-cover rounded" />
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">{image.name}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{image.description}</td>
                              <td className="px-6 py-4 text-sm">
                                  <button className="text-blue-600 hover:text-blue-800 hover:font-bold mr-2">View</button>
                                  <button className="text-red-600 hover:text-red-800 hover:font-bold">Delete</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
}
