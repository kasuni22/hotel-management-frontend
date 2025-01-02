export default function GalleryList() {
    const images = [
      {
        id: 1,
        title: "Luxury Suite View",
        category: "Rooms",
        uploadDate: "2024-12-15",
        size: "2.5 MB",
        status: "Active"
      },
      {
        id: 2,
        title: "Pool Area",
        category: "Amenities",
        uploadDate: "2024-12-14",
        size: "1.8 MB",
        status: "Active"
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Upload Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Size</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {images.map((image) => (
                <tr key={image.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{image.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{image.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{image.uploadDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{image.size}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {image.status}
                    </span>
                  </td>
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