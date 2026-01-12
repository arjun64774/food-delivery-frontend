import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null); // use null instead of ""
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // show nothing until data loads

  const url = "https://food-delivery-backend-xsja.onrender.com";

  const [food_list, setFoodList] = useState([]);

  // --- Cart functions ---
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (!token) return;
    try {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const removeCartItem = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) }));
    if (!token) return;
    try {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = food_list.find((p) => p._id === item);
        if (product) total += product.price * cartItems[item];
      }
    }
    return total;
  };

  // --- Fetch food list ---
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + "/api/food/list");
      setFoodList(res.data.data);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  // --- Load cart from backend ---
  const loadCartData = async (tokenValue) => {
    try {
      const res = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${tokenValue}` } }
      );
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart:", err);
      setCartItems({});
    }
  };

  // --- Login ---
  const login = async (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);
    localStorage.setItem("token", tokenValue);
    await loadCartData(tokenValue);
  };

  // --- Logout ---
  const logout = () => {
    setToken(null);
    setUser(null);
    setCartItems({});
    localStorage.removeItem("token");
  };


  // --- Load on app start ---
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          // Verify token by fetching user profile
          const res = await axios.get(url + "/api/user/profile", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });

          setUser(res.data.user);
          setToken(savedToken);
          await loadCartData(savedToken); // load cart AFTER token verified
        } catch (err) {
          console.error("Token invalid:", err);
          logout();
        }
      }

      setLoading(false); // done loading
    };

    loadData();
  }, []);


  // ✅ Function to refresh food list
const refreshFoodList = async () => {
  try {
    const res = await axios.get(url + "/api/food/list");
    if (res.data.success) {
      setFoodList(res.data.data); // update food_list state
    }
  } catch (err) {
    console.error("Error refreshing food list:", err);
  }
};
    


  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeCartItem,
    getTotalCartAmount,
    url,
    token,
    user,
    login,
    logout,
    loading,
    refreshFoodList
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {!loading && props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
