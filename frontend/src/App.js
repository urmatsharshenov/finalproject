import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import MainLayout from "./components/MainLayout";
import Foods from "./pages/Foods";
import Login from "./pages/Login";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<Navigate to="/foods" />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Foods />} path="/foods" />
          <Route element={<Orders />} path="/orders" />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
