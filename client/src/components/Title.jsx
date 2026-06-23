import React from 'react';

const Title = ({ text1, text2, size }) => {
  return (
   <div className='flex justify-center items-center text-[30px] md:text-[40px] mt-8'>
    <h1 className='text-[#121212] font-black uppercase'>{text1} <span>{text2}</span></h1>
   </div>
  );
};

export default Title;
