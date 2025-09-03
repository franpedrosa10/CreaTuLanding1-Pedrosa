import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail/ItemDetail";
import { db } from "../../services/config";
import { doc, getDoc } from "firebase/firestore";


export default function ItemDetailContainer() {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchItem = async () => {
      try {
        setLoading(true);
        setErr(null);
        setNotFound(false);

        if (!id) {
          setNotFound(true);
          return;
        }

        const ref = doc(db, "productos", id);
        const snap = await getDoc(ref);

        if (!mounted) return;

        if (!snap.exists()) {
          setNotFound(true);
          setItem(null);
        } else {
          // importante: incluir el id del doc
          setItem({ id: snap.id, ...snap.data() });
        }
      } catch (e) {
        if (mounted) setErr("No pudimos cargar el producto.");
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchItem();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="container">Cargando detalle...</div>;
  if (err) return <div className="container error">Error: {err}</div>;
  if (notFound) return <div className="container">Producto no encontrado.</div>;
  if (!item) return null;

  return (
    <div className="container">
      <ItemDetail item={item} />
    </div>
  );
}
