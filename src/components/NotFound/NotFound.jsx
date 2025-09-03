import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container">
      <h2>404 — Página no encontrada</h2>
      <p>El enlace está mal o la página no existe.</p>
      <Link to="/" className="btn">Volver al catálogo</Link>
    </div>
  );
}
