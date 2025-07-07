import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Productos" onClick={() => navigate("/admin/products")} />
        <Card title="Categorías" onClick={() => navigate("/admin/categories")} />
        <Card title="Pedidos" onClick={() => alert("En construcción")} />
      </div>
    </div>
  );
}

function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 cursor-pointer border hover:border-blue-600 transition"
    >
      <h2 className="text-xl font-semibold text-blue-700 text-center">{title}</h2>
    </div>
  );
}
