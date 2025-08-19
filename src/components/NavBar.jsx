import { Link, NavLink } from "react-router-dom";
import { categories } from "../mock/data";
import "./NavBar.css";
import CartWidget from "./CartWidget";

export default function NavBar() {
  const active = ({ isActive }) =>
    "nav-link" + (isActive ? " nav-link--active" : "");

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <img src="/logo.png" alt="logo" className="brand-logo" />
        AFRAM Electronics
      </Link>

      <ul className="nav-links">
        {categories.map((c) => (
          <li key={c.id}>
            <NavLink
              to={c.id === "todas" ? "/" : `/category/${c.id}`}
              className={active}
              end
            >
              {c.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link to="/cart" className="cart">
        <CartWidget />
      </Link>
    </nav>
  );
}
