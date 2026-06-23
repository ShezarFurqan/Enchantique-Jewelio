import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const {
    navigate,
    buyDet,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
    currency,
    isPromoApplied
  } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [productData, setProductData] = useState(null);
  const [productPrice, setProductPrice] = useState(0);

  const [formData, setFormData] = useState({
    country: 'Pakistan',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    apartment: '',
    zipcode: '',
    phone: ''
  });

  useEffect(() => {
    if (buyDet.productId) {
      const product = products.find((item) => item._id === buyDet.productId);
      if (product) {
        setProductData(product);
      }
    }
  }, [buyDet, products]);

  useEffect(() => {
    if (productData) {
      setProductPrice(productData.price * buyDet.quantity);
    }
  }, [buyDet, productData]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      if (productData) {
        orderItems = [{
          ...structuredClone(productData),
          quantity: buyDet.quantity,
          size: buyDet.size || 'default'
        }];
      } else {
        for (const productId in cartItems) {
          for (const size in cartItems[productId]) {
            if (cartItems[productId][size] > 0) {
              const product = products.find((p) => p._id === productId);
              if (product) {
                const item = structuredClone(product);
                item.size = size;
                item.quantity = cartItems[productId][size];
                orderItems.push(item);
              }
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: productData ? productPrice : getCartAmount() + delivery_fee,
        method
      };

      if (method === 'cod') {
        const res = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token }
        });
        if (res.data.success) {
          setCartItems({});
          toast.success("Order placed successfully!");
          navigate('/orders');
        } else {
          toast.error(res.data.message || 'Order failed');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'An error occurred');
    }
  };

  const total = productData
    ? productPrice + delivery_fee
    : getCartAmount() + delivery_fee;

  return (
    <form onSubmit={onSubmitHandler} className='xl:px-36 px-4 py-12'>
      <Title text1="Checkout" />
      <div className='flex xl:flex-row flex-col xl:justify-between items-center'>

        {/* Left Side - Billing Form */}
        <div className='xl:w-[45%] mb-28'>
          <div className='flex flex-col gap-8 rounded-md'>
            <Title text1="Billing" text2="Details" />
            <select
              className='border border-black text-lg py-3 px-2'
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              required
            >
              <option value="Pakistan">Pakistan</option>
            </select>
            <div className='flex sm:flex-row gap-4 w-full'>
              <input name='firstName' value={formData.firstName} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2 w-[50%]' type="text" placeholder='First Name' required />
              <input name='lastName' value={formData.lastName} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2 w-[50%]' type="text" placeholder='Last Name' required />
            </div>
            <input name='email' value={formData.email} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2' type="email" placeholder='Email Address' required />
            <input name='address' value={formData.address} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2' type="text" placeholder='Address' required />
            <div className='flex sm:flex-row gap-4 w-full'>
              <input name='city' value={formData.city} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2 w-[50%]' type="text" placeholder='City' required />
              <input name='apartment' value={formData.apartment} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2 w-[50%]' type="text" placeholder='Apartment, suite, etc (optional)' />
            </div>
            <input name='zipcode' value={formData.zipcode} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2' type="text" placeholder='Zipcode (optional)' />
            <input name='phone' value={formData.phone} onChange={onChangeHandler} className='border border-black text-lg py-3 px-2' type="tel" placeholder='Phone' required />
          </div>
        </div>

        {/* Right Side - Summary + Payment */}
        <div className='xl:w-[40%] border border-slate-400 p-6 text-center'>
          <Title text1="Your" text2="Order" />
          <div className='flex flex-col gap-2 mt-2 text-md'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency} {productData ? productPrice : getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between text-lg'>
              <b>Total</b>
              <b>{currency} {total}.00</b>
            </div>
          </div>

          <Title text1="Payment" text2="Method" />
          <div className='text-left mt-6'>
            <div className='mb-4'>
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={method === 'cod'}
                onChange={() => setMethod('cod')}
              />
              <label htmlFor="cod" className='ml-2 cursor-pointer'>Cash on Delivery</label>
            </div>
            <div className='mb-4'>
              <input
                type="radio"
                id="bank"
                name="payment"
                value="bank"
                disabled
              />
              <label htmlFor="bank" className='ml-2 text-gray-500 cursor-not-allowed'>Direct Bank Transfer (Unavailable)</label>
            </div>
            <div className='mb-4'>
              <input
                type="radio"
                id="card"
                name="payment"
                value="card"
                disabled
              />
              <label htmlFor="card" className='ml-2 text-gray-500 cursor-not-allowed'>Visa/Master via PayFast (Unavailable)</label>
            </div>
          </div>

          <button type="submit" className="mt-12 bg-black text-white px-14 py-3 rounded-md shadow-md hover:bg-[#373737] active:scale-95 transition-transform text-md font-medium">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
