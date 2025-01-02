import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-screen bg-red-400 flex flex-col items-center justify-center p-6">
      <div className="mb-8 flex space-x-6">
        <Link
          className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          to="/admin/rooms"
        >
          Rooms
        </Link>
        <Link
          className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          to="/admin/booking"
        >
          Bookings
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-md p-6">
        <Routes>
          <Route
            path="/rooms"
            element={
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Rooms</h1>
              </div>
            }
          />

          <Route
            path="/booking"
            element={
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
              </div>
            }
          />

          <Route
            path="/*"
            element={
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
