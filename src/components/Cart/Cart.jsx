import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { carrito, total, cantidadTotal, eliminarProducto, vaciarCarrito } =
    useContext(CarritoContext);

  if (carrito.length === 0) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Carrito</h2>

      <ul className="cart-list">
        {carrito.map((prod) => (
          <li key={prod.item.id} className="cart-item" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <img
              src={prod.item.thumbnail}
              alt={prod.item.title}
              style={{ width: 80 }}
            />
            <div className="info" style={{ flexGrow: 1 }}>
              <h4>{prod.item.title}</h4>
              <p>
                ${prod.item.price?.toLocaleString("es-AR")} x {prod.cantidad}
              </p>
              <p>
                Subtotal: ${(prod.item.price * prod.cantidad).toLocaleString("es-AR")}
              </p>
            </div>
            <button className="btn danger" onClick={() => eliminarProducto(prod.item.id)}>
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-footer" style={{ marginTop: 20 }}>
        <p><strong>Cantidad total:</strong> {cantidadTotal}</p>
        <p><strong>Total:</strong> ${total.toLocaleString("es-AR")}</p>
      </div>

      <div className="cart-actions" style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button className="btn ghost" onClick={vaciarCarrito}>
          Vaciar carrito
        </button>
        <Link to="/checkout" className="btn primary">
          Finalizar compra
        </Link>
      </div>
    </div>
  );
}
