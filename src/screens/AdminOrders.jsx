import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8004/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Error al cargar pedidos:", err);
      alert("❌ No se pudieron cargar los pedidos.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Pedidos</h1>

      {orders.length === 0 ? (
        <p className="text-center">No hay pedidos registrados.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <p><span className="font-semibold">Pedido ID:</span> {item.order_id}</p>
              <p><span className="font-semibold">Producto ID:</span> {item.product_id}</p>
              <p><span className="font-semibold">Cantidad:</span> {item.quantity}</p>
              <p><span className="font-semibold">Precio unitario:</span> ${item.unit_price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
