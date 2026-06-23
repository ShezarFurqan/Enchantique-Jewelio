import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "Rs.";
    const delivery_fee = 200;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [buyDet, setBuyDet] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const navigate = useNavigate();

    const setPromoApplied = (value) => {
        setIsPromoApplied(value);
        localStorage.setItem('isPromoApplied', value ? 'true' : 'false');
    };

    useEffect(() => {
        const promoStatus = localStorage.getItem('isPromoApplied');
        if (promoStatus === 'true') {
            setIsPromoApplied(true);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
        getProductsData();
    }, []);



    const addToCart = async (itemId, size) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
                toast.success('Product added')
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }


    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            const sizes = cartItems[itemId];
            for (const size in sizes) {
                const qty = sizes[size];
                if (qty > 0) {
                    totalCount += qty;
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);

            if (token) {
                try {
                    await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
                } catch (error) {
                    console.error(error);
                    toast.error(error.message);
                }
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue;

            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size];
                if (qty > 0) {
                    let price = itemInfo.price;
                    if (isPromoApplied) price *= 0.85;
                    totalAmount += price * qty;
                }
            }
        }
        return totalAmount;
    };

    const buyNow = (productId, size, quantity = 1) => {
        const product = products.find(p => p._id === productId);
        if (product?.size?.length > 0 && !size) {
            toast.error("Select Product Size");
            return;
        }
        setBuyDet({ productId, size: size || "default", quantity });
        navigate("/placeorder");
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch products");
        }
    };

    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: userToken } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch cart");
        }
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        buyNow,
        buyDet,
        setBuyDet,
        isPromoApplied,
        setIsPromoApplied: setPromoApplied,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
