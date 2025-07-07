import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryService";
import axios from "axios";

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    info: "",
    price: "",
    iva: "",
    image: null,
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => console.error("Error cargando categorías", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.image || !form.category_id) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      setLoading(true);
      await axios.post("http://localhost:8005/products/upload", data);
      alert("✅ Producto creado exitosamente");
      setForm({
        name: "",
        description: "",
        info: "",
        price: "",
        iva: "",
        image: null,
        category_id: "",
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Nombre" name="name" value={form.name} onChange={handleChange} required />
        <FormInput label="Descripción" name="description" value={form.description} onChange={handleChange} />
        <FormInput label="Información adicional" name="info" value={form.info} onChange={handleChange} />
        <FormInput label="Precio" name="price" type="number" value={form.price} onChange={handleChange} required />
        <FormInput label="IVA" name="iva" type="number" step="0.01" value={form.iva} onChange={handleChange} />

        <div>
          <label className="block mb-1 font-medium">Imagen *</label>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded px-3 py-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="mt-3 rounded max-h-40 object-contain border"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Categoría *</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.id} - {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-semibold text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creando..." : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}

function FormInput({ label, name, value, onChange, type = "text", required = false, step }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        step={step}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
  );
}
