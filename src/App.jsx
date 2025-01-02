import Header from "./components/header/header.jsx";
import "./App.css";
import HomePage from "./pages/client-page/homePage.jsx";
import AdminPage from "./pages/adminpage/admin.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Routes path="/*">

      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />


      </Routes>

    </BrowserRouter>
  );
}

export default App;
