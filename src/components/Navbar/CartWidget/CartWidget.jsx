import { useContext } from "react";
import { CarritoContext } from "../../../context/CarritoContext";
import { Link } from "react-router-dom";
import "./CartWidget.css";

export default function CartWidget() {
  const { cantidadTotal } = useContext(CarritoContext);

  return (
    <Link to="/cart" className="cart-widget">
      <i className="bi bi-cart"></i>
      {cantidadTotal > 0 && <span className="cart-badge">{cantidadTotal}</span>}
    </Link>
  );
}
