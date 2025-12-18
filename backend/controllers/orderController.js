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


// placing user order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

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

export { placeOrder, verifyOrder };
