import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../mock/api";
import ItemList from "./ItemList";

export default function ItemListContainer({ greeting = "Catálogo" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    getProducts(categoryId)
      .then(setItems)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <div className="container">Cargando productos...</div>;
  if (err) return <div className="container error">Error: {err}</div>;

  return (
    <div className="container">
      <h2 className="title">
        {categoryId ? `Categoría: ${categoryId}` : greeting}
      </h2>
      <ItemList items={items} />
    </div>
  );
}
