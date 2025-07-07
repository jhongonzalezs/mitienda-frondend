import React from "react";

function CartItem({ item, onUpdate, onDelete }) {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <div>
        <p className="font-semibold">{item.product_id}</p>
        <p>Cantidad: {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          +
        </button>
        <button
          onClick={() => onUpdate(item.id, item.quantity - 1)}
          className="px-2 py-1 bg-yellow-500 text-white rounded"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default CartItem;
