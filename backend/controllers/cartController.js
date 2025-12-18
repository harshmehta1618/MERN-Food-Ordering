import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;          // ✅ from authMiddleware
        const itemId = req.body.itemId;     // ✅ from request body

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;          // ✅ from authMiddleware
        const itemId = req.body.itemId;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

// GET CART
const getCart = async (req, res) => {
    try {
        const userId = req.userId;          // ✅ from authMiddleware

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            cartData: userData.cartData || {}
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };
