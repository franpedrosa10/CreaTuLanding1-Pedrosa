import CartWidget from "./CartWidget";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <img src="/logo.png" alt="AFRAM Electronics" />
      </div>

      <div className="navbar-center">
        <ul className="navbar-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>

      <div className="navbar-cart">
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;
