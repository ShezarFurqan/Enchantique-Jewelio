import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import Productitem from './Productitem';
import { useParams } from 'react-router-dom';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const { productId } = useParams()

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory && item._id !== productId
      );
      setRelated(relatedProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);


  return (
    <div className="my-24 flex flex-col justify-center items-center">
      <div className="text-center text-3xl py-2">
        <Title text1="You Might" text2="Also Love" />
      </div>
      <div className="p-12 gap-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {related.map((item) => (
          <Productitem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} category={item.category} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
