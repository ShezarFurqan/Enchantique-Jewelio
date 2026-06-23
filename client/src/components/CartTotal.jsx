import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, isPromoApplied } = useContext(ShopContext);

  const originalSubtotal = getCartAmount();
  const discountedSubtotal = originalSubtotal;
  const total = discountedSubtotal === 0 ? 0 : discountedSubtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" size="4xl" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {isPromoApplied && (
              <span className="line-through text-gray-400 mr-2">
                {currency} {originalSubtotal.toFixed(2)}
              </span>
            )}
            <span className={isPromoApplied ? 'text-green-600 font-semibold' : ''}>
              {currency} {discountedSubtotal.toFixed(2)}
            </span>
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {total.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
