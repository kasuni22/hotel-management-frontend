import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import BookingList from "./BookingList.jsx";
import RoomList from "./RoomList.jsx";
import CategoryList from "./CategoryList.jsx";
import UsersList from "./UserList.jsx";
import FeedbackList from "./FeedbackList";
import GalleryList from "./GalleryList";
import AddCategoryForm from "./addCategoryForm/addCategoryForm.jsx";
import EditCategory from "./EditCategory.jsx"
import AddRoom from "./AddRoom.jsx";
import EditRoom from "./EditRoom.jsx";

export default function AdminPage() {
  let isAdmin = false;

  try {
    const token = localStorage.getItem("token");
    if (token) {
      // Extract the payload (middle segment) from the JWT
      const payloadBase64 = token.split('.')[1];
      // Convert Base64Url schema to standard Base64 string bounds
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      // Decode with atob() and parse back to JSON Object
      const decodedPayload = JSON.parse(atob(base64));

      const currentTime = Date.now() / 1000;

      if (decodedPayload.exp && decodedPayload.exp < currentTime) {
        localStorage.removeItem("token");
      } else if (decodedPayload.type === "admin") {
        isAdmin = true;
      }
    }
  } catch (error) {
    console.error("Token decomposition failed:", error);
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full h-screen flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Routes>

          <Route
            path="/booking"
            element={<BookingList />}
          />

          <Route
            path="/categories"
            element={<CategoryList />}
          />

          <Route
            path="/categories/edit/:id"
            element={<EditCategory />}
          />

          <Route
            path="/add-category"
            element={<AddCategoryForm />}
          />

          <Route
            path="/add-room"
            element={<AddRoom />}
          />

          <Route
            path="/edit-room/:roomId"
            element={<EditRoom />}
          />

          <Route
            path="/rooms"
            element={<RoomList />}
          />

          <Route
            path="/users"
            element={<UsersList />}
          />

          <Route
            path="/feedback"
            element={<FeedbackList />}
          />

          <Route
            path="/gallery"
            element={<GalleryList />}
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