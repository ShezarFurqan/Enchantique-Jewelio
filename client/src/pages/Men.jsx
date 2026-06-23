import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/Productitem";

const Men = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (productsCopy) {
      productsCopy = productsCopy.filter((item) => item.category === "Men");
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    console.log(filterProducts);
  }, filterProducts);

  return filterProducts.length > 0 ? (
    <div>
      <div className="w-full">
        <video
          className="w-full"
          muted
          autoPlay
          loop
          src="https://shoprusset.com/cdn/shop/videos/c/vp/4b319fe4b3004a909778c49a302ff463/4b319fe4b3004a909778c49a302ff463.HD-720p-4.5Mbps-35000822.mp4?v=0"
        ></video>
      </div>

      <div className="mt-20 text-[70px]">
        <Title text1={"Exclusive"} />
      </div>

      <div className="flex">
        <img
          className="w-1/3"
          src="https://shoprusset.com/cdn/shop/files/More_Than_I_Should_3.png?v=1732107848&width=1365"
          alt=""
        />
        <img
          className="w-1/3"
          src="https://shoprusset.com/cdn/shop/files/Copy_of_Copy_of_More_Than_I_Should_1.png?v=1732108167&width=500"
          alt=""
        />
        <img
          className="w-1/3"
          src="https://shoprusset.com/cdn/shop/files/More_Than_I_Should_3683fa40-5e4b-4f07-bd0d-34c0464a09e9.png?v=1703971462&width=500"
          alt=""
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t pl-20 pr-20">
        {/* Filter Options */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>
          {/* SubCategory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-white font-medium">Type</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Rings"}
                  onChange={toggleSubCategory}
                />{" "}
                Rings
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Bracelets"}
                  onChange={toggleSubCategory}
                />{" "}
                Bracelets
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Chains"}
                  onChange={toggleSubCategory}
                />{" "}
                Chains
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Earings"}
                  onChange={toggleSubCategory}
                />{" "}
                Earings
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Anklet"}
                  onChange={toggleSubCategory}
                />{" "}
                Anklet
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Sets"}
                  onChange={toggleSubCategory}
                />{" "}
                Sets
              </p>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <h1 className="font-extrabold text-[#121212] sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl pb-[12.4px]">
              MEN COLLECTION
            </h1>
            {/* product sort */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="block w-fit border border-gray-300 bg-white text-sm text-gray-700 appearance-none py-0 h-10 p-6 leading-none"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          {/* Map Products */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[90px]">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                image={item.image}
                id={item._id}
                name={item.name}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <video autoPlay loop muted>
        <source src={assets.comingsoon} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Men;
