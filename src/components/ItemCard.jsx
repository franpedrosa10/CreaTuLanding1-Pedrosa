import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <article className="card">
      <img src={item.thumbnail} alt={item.title} />
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <p className="price">$ {item.price.toLocaleString("es-AR")}</p>
        <Link to={`/item/${item.id}`} className="btn">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
