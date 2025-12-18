import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    console.log("HEADERS:", req.headers);
    console.log("AUTH HEADER:", req.headers.authorization);
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, Login Again"
            });
        }

        const token = authHeader.split(" ")[1]; // Bearer <token>

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id; // ✅ correct place
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
