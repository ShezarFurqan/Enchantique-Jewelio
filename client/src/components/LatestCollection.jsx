import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./title";
import ProductItem from "./Productitem";
import { use } from "react";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [bridal, setBridal] = useState([]);
  const [couple, setCouple] = useState([]);

  useEffect(() => {
    const menproduct = products.filter(
      (item) => item.newCollection === true && item.category === "Men"
    );
    setMen(menproduct);

    const womenproduct = products.filter(
      (item) => item.newCollection === true && item.category === "Women"
    );
    setWomen(womenproduct);

    const bridalproduct = products.filter(
      (item) => item.newCollection === true && item.category === "Bridal"
    );
    setBridal(bridalproduct);

    const coupleproduct = products.filter(
      (item) => item.newCollection === true && item.category === "Couple"
    );
    setCouple(coupleproduct);
  }, [products]);

  return (
    <div >
      <Title text1={"New"} text2={"Collection"} />

      {men.length > 0 && <div className="flex flex-col items-start">
        <Title text1={"Men"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 gap-y-6">
          {men.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              category={item.category}
            />
          ))}
        </div>
      </div>}

      {women.length > 0 && <div className="flex flex-col items-start">
        <Title text1={"Women"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 gap-y-6">
          {women.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              category={item.category}
            />
          ))}
        </div>
      </div>}
    </div>
  );
};

export default LatestCollection;
