import ItemCard from "./ItemCard";

export default function ItemList({ items }) {
  if (!items?.length) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <div className="grid">
      {items.map((it) => (
        <ItemCard key={it.id} item={it} />
      ))}
    </div>
  );
}
