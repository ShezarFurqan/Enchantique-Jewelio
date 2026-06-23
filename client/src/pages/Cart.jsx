import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    setBuyDet,
    buyDet,
    isPromoApplied,
  } = useContext(ShopContext);

  // Optimized: Compute cartData using useMemo instead of useEffect + useState
  const cartData = useMemo(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    return tempData;
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartData.length === 0) {
      toast.error('Your cart is empty!');
    } else {
      navigate('/placeorder');
      if (buyDet) {
        setBuyDet({});
      }
    }
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-16">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            Your cart is empty.
          </p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;

            const price = isPromoApplied
              ? (productData.price * 0.85).toFixed(2)
              : productData.price.toFixed(2);

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {price}
                      </p>
                      {
                        productData.sizes &&
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item.size}
                        </p>
                      }
                    </div>
                  </div>
                </div>

                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1) {
                      updateQuantity(item._id, item.size, val);
                    }
                  }}
                />

                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  aria-label="Remove item from cart"
                >
                  <img
                    className="w-4 sm:w-5 mr-4 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Delete item"
                  />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-center mt-5">
            <Button onClick={handleCheckout} label={'PROCEED TO CHECKOUT'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
