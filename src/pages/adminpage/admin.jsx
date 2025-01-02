import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";  // Make sure to include the .jsx extension

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-100 p-6">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-md p-6">
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
    </div>
  );
}