import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    info: "",
    price: "",
    iva: "",
    category_id: "",
    image: ""
  });

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8005/products");
      setProducts(res.data);
    } catch (error) {
      alert("Error al cargar productos");
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:8005/products/${id}`);
        loadProducts();
      } catch (err) {
        alert("Error al eliminar el producto");
        console.error(err);
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      info: product.info || "",
      price: product.price,
      iva: product.iva,
      category_id: product.category_id || "",
      image: product.image || ""
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8005/products/${editingProduct.id}`, form);
      alert("✅ Producto actualizado");
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      alert("❌ Error al actualizar el producto");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Listado de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition relative"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
            )}
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-medium mt-2">${product.price}</p>
            <p className="text-xs mt-1 text-gray-500">IVA: {product.iva}</p>
            <p className="text-xs mt-1 text-gray-500">Categoría ID: {product.category_id}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => openEditModal(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <div className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nombre"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descripción"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="info"
                value={form.info}
                onChange={(e) => setForm({ ...form, info: e.target.value })}
                placeholder="Información adicional"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Precio"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="iva"
                type="number"
                value={form.iva}
                onChange={(e) => setForm({ ...form, iva: e.target.value })}
                placeholder="IVA"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="category_id"
                type="number"
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                placeholder="Categoría ID"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="URL de la imagen"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
