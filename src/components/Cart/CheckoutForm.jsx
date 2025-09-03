import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import {
  doc,
  runTransaction,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/config"; 

export default function CheckoutForm() {
  const { carrito, total, vaciarCarrito, cantidadTotal } = useContext(CarritoContext);

  const [buyer, setBuyer] = useState({ nombre: "", email: "", telefono: "" });
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (carrito.length === 0) {
      setErr("El carrito está vacío.");
      return;
    }

    const items = carrito.map((p) => ({
      productId: String(p.item.id),
      nombre: p.item.title ?? p.item.nombre ?? "",
      precio: Number(p.item.price ?? p.item.precio ?? 0),
      qty: Number(p.cantidad || 0),
    }));

    setLoading(true);
    try {
      const newOrderId = await runTransaction(db, async (tx) => {
        const productDocs = await Promise.all(
          items.map(async (it) => {
            const ref = doc(db, "productos", it.productId);
            const snap = await tx.get(ref);
            if (!snap.exists()) {
              throw new Error(`Producto no existe: ${it.productId}`);
            }
            return { ref, data: snap.data() };
          })
        );

        const faltantes = [];
        productDocs.forEach(({ data }, i) => {
          const actual = Number(data.stock ?? 0); 
          const pedido = items[i].qty;
          if (actual < pedido) {
            faltantes.push({
              nombre: items[i].nombre,
              pedido,
              disponible: actual,
            });
          }
        });

        if (faltantes.length > 0) {
          const msg = faltantes
            .map((f) => `${f.nombre} (pediste ${f.pedido}, hay ${f.disponible})`)
            .join(" • ");
          throw new Error(`Sin stock suficiente: ${msg}`);
        }

        productDocs.forEach(({ ref, data }, i) => {
          const actual = Number(data.stock ?? 0);
          const pedido = items[i].qty;
          tx.update(ref, { stock: actual - pedido }); 
        });

        const ordersCol = collection(db, "ordenes"); 
        const orderRef = doc(ordersCol); 

        const payload = {
          buyer: {
            name: buyer.nombre,
            email: buyer.email,
            phone: buyer.telefono,
          },
          items,
          total: Number(total),
          status: "created",
          createdAt: serverTimestamp(),
        };

        tx.set(orderRef, payload);
        return orderRef.id;
      });

      setOrderId(newOrderId);
      vaciarCarrito();
    } catch (e) {
      console.error(e);
      setErr(e.message || "No pudimos generar la orden. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu código de orden es:</p>
        <code style={{ fontSize: 18 }}>{orderId}</code>
        <div style={{ marginTop: 16 }}>
          <Link to="/" className="btn">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Checkout</h2>

    <div className="card" style={{ marginBottom: 16 }}>
    <h3>Resumen de la compra</h3>
    <p><strong>Items:</strong> {cantidadTotal}</p>
    <p><strong>Total:</strong> ${Number(total).toLocaleString("es-AR")}</p>

    <p><strong>Productos distintos:</strong> {carrito.length}</p>

    <ul style={{ marginTop: 8, paddingLeft: 18 }}>
        {carrito.slice(0, 3).map((prod) => (
        <li key={prod.item.id}>
            {prod.item.title} — {prod.cantidad} x $
            {Number(prod.item.price).toLocaleString("es-AR")}
        </li>
        ))}
        {carrito.length > 3 && (
        <li>... y {carrito.length - 3} más</li>
        )}
    </ul>


    {carrito.length === 0 && <p>Tu carrito está vacío.</p>}
    </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Nombre
          <input
            value={buyer.nombre}
            onChange={(e) => setBuyer((v) => ({ ...v, nombre: e.target.value }))}
            required
          />
        </label>

        <label>Email
          <input
            type="email"
            value={buyer.email}
            onChange={(e) => setBuyer((v) => ({ ...v, email: e.target.value }))}
            required
          />
        </label>

        <label>Teléfono
          <input
            value={buyer.telefono}
            onChange={(e) => setBuyer((v) => ({ ...v, telefono: e.target.value }))}
          />
        </label>

        {err && <p className="error" style={{ color: "crimson" }}>{err}</p>}

        <button type="submit" className="btn primary" disabled={loading || carrito.length === 0}>
          {loading ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
}
