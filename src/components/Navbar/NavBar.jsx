import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../services/config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import CartWidget from "./CartWidget/CartWidget"
import "./NavBar.css";

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(
          collection(db, "categorias"),
          where("activa", "==", true),
          orderBy("name")
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setCategories(data);
      } catch (e) {
        console.error("Error cargando categorías", e);
      }
    };
    fetchCategories();
  }, []);

  const active = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-link--active" : "");

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <img src="/logo.png" alt="logo" className="brand-logo" />
        AFRAM Electronics
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={active} end>
            Todas
          </NavLink>
        </li>
        {categories.map((c) => (
          <li key={c.id}>
            <NavLink to={`/category/${c.slug}`} className={active} end>
              {c.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <CartWidget />
    </nav>
  );
}
