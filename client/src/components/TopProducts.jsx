import React from 'react'

const TopProducts = () => {
  return (
    <div className='w-full'>
        <div className='w-full bg-black text-white overflow-x-auto whitespace-nowrap flex items-center scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 gap-16 md:justify-center md:text-[20px] pl-6 pr-6'>
            <span>Shop sale products</span>
            <span>Free Shipping on orders $49+ for members</span>
            <span>1-Year-Limited Waranty</span>
            <span>Easy returns</span>
        </div>  
        <div className='w-full md:flex justify-between'>
          <div className='md:w-[49.5%] relative'>
            <h1 className='text-2xl absolute text-white font-bold md:text-5xl bottom-5 left-5'>SAVE ON CURRENT PRODUCT <br /> <span className='text-xl md:text-2xl'>UP TO 30% OFF {'>'}</span></h1>
          <img className='' src="./images/aiproducts.webp" alt="" />
          </div>
          <div className='md:w-[49.5%] relative'>
          <h1 className='text-2xl absolute text-white font-bold md:text-5xl bottom-5 left-5'>BORN TO BE WORN <br /> <span className='text-xl md:text-2xl'>SHOP THE WASHED COLLECTION {'>'}</span></h1>
          <img className='' src="./images/aiproduct1.webp" alt="" />
          </div>
        </div>
    </div>
  )
}

export default TopProducts
