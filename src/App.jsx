import Header from "./components/header/header.jsx";
import "./App.css";
import HomePage from "./pages/client-page/homePage.jsx";
import AdminPage from "./pages/adminpage/admin.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Routes path="/*">

      <Route path="/" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/*" element={
        <div className="w-full h-[100vh] bg-green-400">404 Not Found</div>} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;
