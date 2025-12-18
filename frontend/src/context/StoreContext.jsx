import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";

    // 🔹 FOOD LIST
    const [food_list, setFoodList] = useState([]);

    // 🔹 CART (null = loading, {} = loaded empty)
    const [cartItems, setCartItems] = useState(null);

    // 🔹 AUTH TOKEN
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    /* =======================
       FOOD LIST
    ======================== */
    const fetchFoodList = async () => {
        try {
            const res = await axios.get(url + "/api/food/list");
            if (res.data.success) {
                setFoodList(res.data.data);
            }
        } catch (err) {
            console.error("Food fetch failed", err);
        }
    };

    useEffect(() => {
        fetchFoodList();
    }, []);

    /* =======================
       CART
    ======================== */

    const fetchCart = async () => {
        if (!token) return;

        try {
            const res = await axios.get(url + "/api/cart/get", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {
                setCartItems(res.data.cartData || {});
            }
        } catch (err) {
            console.error("Fetch cart failed", err);
            setCartItems({});
        }
    };

    // ✅ fetch cart on load + token change
    useEffect(() => {
        if (token) {
            fetchCart();
        }
    }, [token]);

    // 🔹 ADD TO CART
    const addToCart = async (itemId) => {
        if (!token) return;

        try {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(prev => ({
                ...(prev || {}),
                [itemId]: ((prev?.[itemId]) || 0) + 1
            }));

        } catch (err) {
            console.error("Add to cart failed", err);
        }
    };

    // 🔹 REMOVE FROM CART
    const removeFromCart = async (itemId) => {
        if (!token) return;

        try {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(prev => ({
                ...(prev || {}),
                [itemId]: Math.max((prev?.[itemId] || 1) - 1, 0)
            }));

        } catch (err) {
            console.error("Remove from cart failed", err);
        }
    };

    /* =======================
       TOTAL CART AMOUNT
    ======================== */
    const getTotalCartAmount = () => {
        if (!cartItems) return 0;

        let total = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(
                    item => item._id === itemId
                );
                if (itemInfo) {
                    total += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return total;
    };

    const contextValue = {
        food_list,
        fetchFoodList,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
