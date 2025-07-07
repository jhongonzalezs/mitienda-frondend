import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Home() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">
          Bienvenido, {user?.username || user?.email || "Usuario"}
        </h1>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Cargando productos...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
