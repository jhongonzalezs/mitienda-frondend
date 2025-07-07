import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategoryProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get("http://localhost:8003/categories"),
          axios.get("http://localhost:8005/products"),
        ]);
        setCategories(catRes.data);
        setAllProducts(prodRes.data);
      } catch (err) {
        alert("Error al cargar categorías o productos");
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);

    if (!categoryId) {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts.filter(
        (product) => String(product.category_id) === String(categoryId)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Productos por Categoría</h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Selecciona una categoría:</label>
        <select
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Selecciona una categoría --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.id} - {cat.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
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
            </div>
          ))}
        </div>
      ) : selectedCategoryId ? (
        <p className="text-center text-gray-500">No hay productos para esta categoría.</p>
      ) : null}
    </div>
  );
}
