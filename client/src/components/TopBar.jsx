import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-black w-full overflow-hidden">
      <div className="marquee-track whitespace-nowrap">
        <div className="marquee-content inline-block">
          <span className="text-[#D9D400] text-sm md:text-base px-4">
            Free Shipping on orders above PKR: 5000+
          </span>
          <span className="text-[#D9D400] text-sm md:text-base px-4">
            Get Special discounts on new arrivals — use promo code <span className='text-green-400'>enchanXZQ69</span> and get 15% off on your favourite item
          </span>
        </div>
        {/* Duplicate for infinite loop */}
        <div className="marquee-content inline-block">
          <span className="text-[#D9D400] text-sm md:text-base px-4">
            Free Shipping on orders above PKR: 5000+
          </span>
          <span className="text-[#D9D400] text-sm md:text-base px-4">
            Get Special discounts on new arrivals — use promo code <span className='text-green-400'>enchanXZQ69</span> and get 15% off on your favourite item
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
