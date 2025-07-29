import "./CartWidget.css";

const CartWidget = () => {
  return (
    <div className="cart-widget">
      <i className="bi bi-cart"></i>
      <span className="cart-badge">1</span>
    </div>
  );
};

export default CartWidget;
