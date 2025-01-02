import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import BookingList from "./BookingList.jsx";
import RoomList from "./RoomList.jsx";
import CategoryList from "./CategoryList.jsx";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Routes>
          <Route
            path="/rooms"
            element={<RoomList />}
          />

          <Route
            path="/booking"
            element={<BookingList />}
          />

          <Route
            path="/categories"
            element={<CategoryList />}
          />

          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>
                <p className="mt-4 text-gray-600">Select an option from the sidebar to get started.</p>
              </div>
            }
          />

          <Route
            path="*"
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