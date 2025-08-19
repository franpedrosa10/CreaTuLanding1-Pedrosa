import { products } from "./data";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts(categoryId) {
  await delay(600);
  if (!categoryId || categoryId === "todas") return products;
  return products.filter((p) => p.category === categoryId);
}

export async function getProductById(id) {
  await delay(600);
  const found = products.find((p) => p.id === id);
  if (!found) throw new Error("Producto no encontrado");
  return found;
}
