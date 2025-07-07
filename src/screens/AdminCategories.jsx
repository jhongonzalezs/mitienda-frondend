import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    const res = await axios.get("http://localhost:8003/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:8003/categories", { name, description });
      setName("");
      setDescription("");
      load();
    } catch (e) {
      alert("Error al crear categoría");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      await axios.delete(`http://localhost:8003/categories/${id}`);
      load();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Administrar Categorías</h1>
      <div className="space-y-2 mb-6">
        <input
          placeholder="Nombre"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Descripción"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={handleCreate}
        >
          Crear Categoría
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="border p-2 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{cat.name}</p>
              <p className="text-sm text-gray-600">{cat.description}</p>
            </div>
            <button
              onClick={() => handleDelete(cat.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}  