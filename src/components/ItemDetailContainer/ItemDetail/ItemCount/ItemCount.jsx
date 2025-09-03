import { useState } from "react";

export default function ItemCount({ initial = 1, stock = 0, onAdd }) {
  const [count, setCount] = useState(initial);

  const dec = () => setCount((c) => Math.max(1, c - 1));
  const inc = () => setCount((c) => Math.min(stock, c + 1));

  const handleAdd = () => {
    if (stock > 0 && onAdd) {
      onAdd(count);
    }
  };

  return (
    <div className="count">
      <div className="count-controls">
        <button onClick={dec} disabled={count <= 1}>
          -
        </button>
        <input
          className="count-input"
          value={count}
          readOnly
          aria-label="Cantidad seleccionada"
        />
        <button onClick={inc} disabled={count >= stock}>
          +
        </button>
      </div>

      <button
        className="btn primary"
        onClick={handleAdd}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
}
