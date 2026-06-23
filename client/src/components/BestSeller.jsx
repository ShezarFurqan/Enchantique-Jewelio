import React, { useContext, useEffect, useState } from 'react';
import Title from './title';
import Productitem from './Productitem';
import { ShopContext } from '../context/ShopContext';


const BestSeller = () => {

  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller); // Filter bestseller products
    setBestSeller(bestProduct.slice(0, 5)); // Get the first 5 bestseller products
  }, [products]);

  return (
    <div className='my-10 mx-10 flex flex-col items-center justify-center'>
      <div className='text-center text-3xl py-8'>
        <Title text1={"BEST"} text2={"SELLERS"} />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 gap-y-6'>
        {bestSeller.map((item, index) => (
          <Productitem 
            key={index} 
            id={item._id} 
            image={item.image} 
            name={item.name} 
            price={item.price} 
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
