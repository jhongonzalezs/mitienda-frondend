// src/components/ProductCard.jsx
import React, { useState } from "react";
import ProductModal from "./ProductModal";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getCategoryById } from "../services/categoryService";

function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleOpen = async () => {
    setShowModal(true);
    if (product.category_id) {
      try {
        const category = await getCategoryById(product.category_id);

        if (category && typeof category.name === "string") {
          setCategoryName(category.name);
        } else {
          // Si no viene .name o no es string
          console.warn("Respuesta inesperada:", category);
          setCategoryName("Desconocida");
        }
      } catch (error) {
        console.error("Error al obtener la categoría:", error);
        setCategoryName("Desconocida");
      }
    } else {
      setCategoryName("Sin categoría");
    }
  };


  const handleClose = () => {
    setShowModal(false);
    setCategoryName(null);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await axios.post("http://localhost:8002/cart", {
        user_id: user.id,
        product_id: product.id,
        quantity: 1,
      });
      addToCart(product);
      alert("✅ Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("❌ No se pudo agregar al carrito");
    }
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl"
        />
        <div className="mt-3">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 text-sm truncate">{product.description}</p>
          <p className="text-sm text-gray-500 mt-1">Info: {product.info}</p>
          <p className="text-base font-bold text-indigo-600 mt-1">
            ${(product.price + product.iva).toFixed(2)}
          </p>
          <button
            className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          categoryName={categoryName}
          onClose={handleClose}
        />
      )}
    </>
  );
}

export default ProductCard;
