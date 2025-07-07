// src/components/Header.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link to="/">Mi Tienda</Link>
      </h1>

      {user ? (
        <div className="flex items-center gap-4">
          <span>Hola, {user.username}</span>

          {/* Solo mostrar carrito si NO es admin */}
          {user.username !== "admin" && (
            <Link to="/cart" className="relative">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Botón cerrar sesión para todos los usuarios */}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <span>Bienvenido</span>
      )}
    </header>
  );
}
