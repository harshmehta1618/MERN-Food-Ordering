import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order/list");
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ MUST be inside component
  const removeOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/order/delete",
        { orderId }
      );

      if (res.data.success) {
        // ✅ immediate UI update
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );

        // ✅ keep frontend + DB in sync
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2>All Orders</h2>

      {orders.length === 0 && (
        <p style={{ color: "#777" }}>No orders found.</p>
      )}

      {orders.map((order) => (
        <div key={order._id} className="order-box">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Amount:</b> ₹{order.amount}</p>

          <p>
            <b>Payment:</b>{" "}
            <span className={order.payment ? "paid" : "pending"}>
              {order.payment ? "Paid" : "Pending"}
            </span>
          </p>

          <p><b>Status:</b> {order.status}</p>

          <p><b>Items:</b></p>
          <div className="order-items">
            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} × {item.quantity}
              </p>
            ))}
          </div>

          <p>
            <b>Address:</b>{" "}
            {order.address?.street}, {order.address?.city}
          </p>

          <button
            className="remove-btn"
            onClick={() => removeOrder(order._id)}
          >
            Remove Order
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Orders;
