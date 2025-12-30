import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder,verifyOrder, listOrders, updateOrderStatus, deleteOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.get("/verify", verifyOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateOrderStatus);
orderRouter.post("/delete", deleteOrder);




export default orderRouter;
