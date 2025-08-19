import { useState } from "react";

export default function ItemCount({ initial = 1, stock = 0, onAdd }) {
  const [count, setCount] = useState(initial);
  const dec = () => setCount((c) => Math.max(1, c - 1));
  const inc = () => setCount((c) => Math.min(stock, c + 1));

  return (
    <div className="count">
      <div className="count-controls">
        <button onClick={dec} disabled={count <= 1}>-</button>
        <input className="count-input" value={count} readOnly />
        <button onClick={inc} disabled={count >= stock}>+</button>
      </div>
      <button className="btn primary" onClick={() => onAdd?.(count)} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
}
