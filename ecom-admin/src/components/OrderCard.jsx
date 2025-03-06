const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <h3>Order ID: {order.id}</h3>
      <p>User ID: {order.userId}</p>
      <p>Total: ${order.total}</p>
    </div>
  );
};

export default OrderCard;