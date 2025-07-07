import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryService";
import axios from "axios";

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    info: "",
    price: 0,
    iva: 0,
    image: null,
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in form) data.append(key, form[key]);

    try {
      await axios.post("http://localhost:8005/products/upload", data);
      alert("✅ Producto creado correctamente");
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear el producto");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Nombre" className="input" onChange={handleChange} />
        <input name="description" placeholder="Descripción" className="input" onChange={handleChange} />
        <input name="info" placeholder="Información adicional" className="input" onChange={handleChange} />
        <input name="price" type="number" placeholder="Precio" className="input" onChange={handleChange} />
        <input name="iva" type="number" placeholder="IVA" className="input" onChange={handleChange} />
        <input name="image" type="file" className="input" onChange={handleChange} />

        <select name="category_id" className="input" onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.id} - {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}
