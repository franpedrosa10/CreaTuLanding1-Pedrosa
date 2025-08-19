import ItemCount from "./ItemCount";

export default function ItemDetail({ item }) {
  return (
    <section className="detail">
      <img src={item.thumbnail} alt={item.title} className="detail-img" />
      <div className="detail-body">
        <h2>{item.title}</h2>
        <p className="price">$ {item.price.toLocaleString("es-AR")}</p>
        <p className="desc">{item.description}</p>
        <p className="stock">Stock: {item.stock}</p>

        <ItemCount
          initial={1}
          stock={item.stock}
          onAdd={(qty) => alert(`Agregado ${qty} unidad(es)`)}
        />
      </div>
    </section>
  );
}
