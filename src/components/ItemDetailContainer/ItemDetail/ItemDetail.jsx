import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../../context/CarritoContext";  
import ItemCount from "./ItemCount/ItemCount";

export default function ItemDetail({ item }) {
  const { agregarAlCarrito } = useCarrito();
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const { id, title, price, thumbnail, description, stock } = item;

  const handleAdd = (qty) => {
    agregarAlCarrito({ id, title, price, thumbnail, stock }, qty);
    setAdded(true);
  };

  return (
    <section className="detail">
      <img src={thumbnail} alt={title} className="detail-img" />

      <div className="detail-body">
        <h2>{title}</h2>
        <p className="price">$ {Number(price).toLocaleString("es-AR")}</p>
        <p className="desc">{description}</p>
        <p className="stock">Stock: {stock ?? 0}</p>

        {!added ? (
          <ItemCount initial={1} stock={stock ?? 0} onAdd={handleAdd} />
        ) : (
          <div className="post-add-actions">
            <Link to="/cart" className="btn">Ir al carrito</Link>
            <Link to="/" className="btn ghost">Seguir comprando</Link>
          </div>
        )}
        {stock === 0 && (
          <small style={{ color: "crimson" }}>Producto sin stock</small>
        )}
      </div>
    </section>
  );
}
