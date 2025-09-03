import { createContext, useState } from "react";
import { useContext } from "react";

export const useCarrito = () => {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
};

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  const agregarAlCarrito = (item, cantidad) => {
    const productoExistente = carrito.find(prod => prod.item.id === item.id);

    if (!productoExistente) {
      setCarrito(prev => [...prev, { item, cantidad }]);
      setCantidadTotal(prev => prev + cantidad);
      setTotal(prev => prev + item.price * cantidad);
    } else {
      const carritoActualizado = carrito.map(prod =>
        prod.item.id === item.id
          ? { ...prod, cantidad: prod.cantidad + cantidad }
          : prod
      );
      setCarrito(carritoActualizado);
      setCantidadTotal(prev => prev + cantidad);
      setTotal(prev => prev + item.price * cantidad);
    }
  };

  const eliminarProducto = (id) => {
    const productoEliminado = carrito.find(prod => prod.item.id === id);
    if (!productoEliminado) return;

    const carritoActualizado = carrito.filter(prod => prod.item.id !== id);
    setCarrito(carritoActualizado);
    setCantidadTotal(prev => prev - productoEliminado.cantidad);
    setTotal(prev => prev - productoEliminado.item.price * productoEliminado.cantidad);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCantidadTotal(0);
    setTotal(0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        total,
        cantidadTotal,
        agregarAlCarrito,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
