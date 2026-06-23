import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Button from './Button'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, category }) => {
  const { currency, navigate } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`}>
    <div className='h-fit relative w-72'>
      <div className='p-1 px-2 top-4 left-4 text-sm absolute text-white bg-[black]'>{category}</div>
      <img className='w-full h-[320px]' src={image[0]} alt="" />
      <div>
        <p className='font-medium text-lg'>{name}</p>
        <p>{currency}{price}</p>
      </div>
      <div className='my-2 mt-2 text-center'>
        <button className="bg-[black] text-white px-[94.6px] py-3 rounded-md shadow-md hover:bg-[#373737] active:scale-95 transition-transform text-md font-medium">ADD TO CART</button>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;