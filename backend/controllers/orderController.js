import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.query;

  const order = await orderModel.findById(orderId);
  if (!order) return res.json({ success: false });

  if (success === "true") {
    await orderModel.findByIdAndUpdate(orderId, { payment: true });
  } else {
    await orderModel.findByIdAndDelete(orderId);
  }

  res.json({ success: true });
};

// ADMIN: get all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};



// placing user order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    // ✅ userId comes from auth middleware
    const newOrder = new orderModel({
      userId: req.userId,        // 🔥 FIX HERE
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();

    // ✅ clear cart safely
    await userModel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    res.json({
      success: true,
      session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  await orderModel.findByIdAndUpdate(req.body.orderId, {
    status: req.body.status,
  });
  res.json({ success: true });
};

// ADMIN: delete order
const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: true, message: "Order removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting order" });
  }
};


export { placeOrder, verifyOrder, listOrders, updateOrderStatus, deleteOrder};
