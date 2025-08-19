import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../mock/api";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    getProductById(id)
      .then(setItem)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Cargando detalle...</div>;
  if (err) return <div className="container error">Error: {err}</div>;
  if (!item) return null;

  return (
    <div className="container">
      <ItemDetail item={item} />
    </div>
  );
}
