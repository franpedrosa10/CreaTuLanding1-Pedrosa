import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList/ItemList";
import { db } from "../../services/config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export default function ItemListContainer({ greeting = "Catálogo" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErr(null);

        const baseRef = collection(db, "productos");

        const q = categoryId
          ? query(baseRef, where("category", "==", categoryId), orderBy("title"), limit(60))
          : query(baseRef, orderBy("title"), limit(60));

        const snap = await getDocs(q);
        if (!mounted) return;

        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(data);
      } catch (e) {
        console.error(e);
        if (mounted) setErr("No pudimos cargar el catálogo.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
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
