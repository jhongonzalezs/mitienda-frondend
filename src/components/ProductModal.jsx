// src/components/ProductModal.jsx
import React from "react";

function ProductModal({ product, categoryName, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded mb-4"
        />
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-500 mt-1">Info: {product.info}</p>
        <p className="text-sm text-gray-700 mt-1">
          Categoría: <strong>{categoryName || "Cargando..."}</strong>
        </p>
        <p className="text-xl font-semibold text-indigo-600 mt-3">
          ${(product.price + product.iva).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductModal;
