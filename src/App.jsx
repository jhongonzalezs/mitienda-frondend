// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import AdminDashboard from "./screens/AdminDashboard";
import AdminProducts from "./screens/AdminProducts";
import AdminCategories from "./screens/AdminCategories";
import { useAuth } from "./context/AuthContext";
import PrivateLayout from "./layouts/PrivateLayout";



function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;
  if (user.username === "admin" && ["/", "/cart"].includes(location.pathname)) {
    return <Navigate to="/admin" />;
  }

  if (user.username !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/" />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}



// Redirigir si ya está logueado
function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        {/* Rutas del admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
