// src/screens/Cart.jsx
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price + item.iva) * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm">
                    Precio: ${(item.price + item.iva).toFixed(2)}
                  </p>
                  <p className="text-sm">Cantidad: {item.quantity}</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      className="text-white bg-blue-600 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="text-white bg-blue-600 px-2 py-1 rounded"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <button
                      className="text-white bg-red-600 px-2 py-1 rounded"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-lg font-bold">
            Total: ${total.toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;
