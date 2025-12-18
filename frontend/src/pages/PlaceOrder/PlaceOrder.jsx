import React, { useState, useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    console.log("PLACE ORDER CLICKED");

    if (!token) {
      alert("Please login first");
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    if (orderItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const payload = {
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      address: data,
    };

    console.log("ORDER PAYLOAD:", payload);

    try {
      const response = await fetch(`${url}/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // ✅ THIS
        },
        body: JSON.stringify(payload),
      });


      const result = await response.json();
      console.log("ORDER RESPONSE:", result);

      if (!response.ok || !result.success) {
        alert(result.message || "Order failed");
        return;
      }

      window.location.href = result.session_url;
    } catch (error) {
      console.error("ORDER ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-holder-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last name" />
        </div>

        <input required name="email" value={data.email} onChange={onChangeHandler} placeholder="Email" />
        <input required name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" />

        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} placeholder="State" />
        </div>

        <div className="multi-fields">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder="Zip" />
          <input required name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" />
        </div>

        <input required name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" />
      </div>

      <div className="place-holder-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <div className="cart-total-details total">
            <p>Total</p>
            <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
          </div>

          <button type="submit" className="checkout-btn">
            Proceed to PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
