import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/Productitem';

const Shop = () => {

  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState("relevant")

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () =>{

    let productsCopy = products.slice();

    if (category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
        break;
      default:
        applyFilter();
        break;
    }
   }

  useEffect(() => {
   setFilterProducts(products)
  }, [])

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct()
  },[sortType])

  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t pl-20 pr-20'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-white font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Men"} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Women"} onChange={toggleCategory} /> Women
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-white font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Rings"} onChange={toggleSubCategory}/> Rings
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Bracelets"} onChange={toggleSubCategory}/> Bracelets
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Chains"} onChange={toggleSubCategory}/> Chains
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Earings"} onChange={toggleSubCategory}/> Earings
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Anklet"} onChange={toggleSubCategory}/> Anklet
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Sets"} onChange={toggleSubCategory}/> Sets
            </p>
          </div>
        </div>
      </div>



      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between'>
          <h1 className='w-full font-extrabold text-[#121212] sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl pb-[12.4px]'>ALL COLLECTION</h1>
          {/* product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="block w-fit border border-gray-300 bg-white text-sm text-gray-700 appearance-none py-0 h-10 p-6 leading-none">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[90px]'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} image={item.image} id={item._id} name={item.name} price={item.price} category={item.category} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Shop
