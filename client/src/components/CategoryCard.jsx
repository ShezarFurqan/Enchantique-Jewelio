import React, { useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

const CategoryCard = () => {
    const sliderRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -540, behavior: 'smooth' });
            setProgress((prev) => Math.max(prev - 10, 0));
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 540, behavior: 'smooth' });
            setProgress((prev) => Math.min(prev + 10, 100));
        }
    };

    return (
        <div>
            <div className='px-10 py-10'>
            <h1 className='py-6 text-2xl sm:text-[44px] leading-[105%] font-semibold text-[#272727]'>Redefining Beauty,<hr></hr>Revolutionizing Style</h1>
            <p className='font-medium text-md py-6 text-[#272727]'>Changing the Narrative, One piece at a time</p>
                <div className='flex gap-6 overflow-hidden' ref={sliderRef}>
                    {[...Array(8)].map((_, index) => (
                        <img
                            key={index}
                            className='w-[520px] h-[270px] rounded-md'
                            src={assets.Alchemy}
                            alt='Alchemy'
                        />
                    ))}
                </div>
                <div className='flex items-center mt-6'>
                    <div className='w-[95%] h-1 bg-gray-200 relative'>
                        <div
                            className='absolute left-0 top-0 h-full bg-gray-600'
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <button onClick={scrollLeft} className='ml-2 p-2 bg-gray-300 rounded-full'>
                        <RiArrowLeftLine size={24} />
                    </button>
                    <button onClick={scrollRight} className='ml-2 p-2 bg-gray-300 rounded-full'>
                        <RiArrowRightLine size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;