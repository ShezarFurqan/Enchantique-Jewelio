import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='relative lg:h-[400px] overflow-hidden bg-black text-white mt-10 '>
            {/* Background Image */}
            <img src={assets.footer_img} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />

            {/* Overlay */}
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60'></div>

            <div className='relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-start xl:items-center px-6 md:px-12 lg:px-16 xl:px-24 py-10 space-y-8 lg:space-y-0'>
                {/* Logo and Description */}
                <div className='lg:w-1/3 xl:w-1/4'>
                    <img src={assets.footer_logo_company} className='mb-5 w-28 md:w-32' alt="Logo" />
                    <p className='text-gray-400 text-sm leading-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A porro blanditiis nesciunt amet maxime non, velit consequuntur deleniti dignissimos numquam illo aliquid sed explicabo ex. Earum commodi aspernatur possimus officiis.
                    </p>
                </div>

                {/* Company Section */}
                <div className='lg:w-1/3 xl:w-1/4'>
                    <h3 className='text-lg font-semibold mb-4'>Company</h3>
                    <ul className='flex flex-col space-y-2'>
                        <li><a href="/" className='hover:text-gray-300'>Home</a></li>
                        <li><a href="/about" className='hover:text-gray-300'>About Us</a></li>
                        <li><a href="/refundandshipping" className='hover:text-gray-300'>Refund & Shipping Policy </a></li>
                    </ul>
                </div>

                {/* Get in Touch Section */}
                <div className='lg:w-1/3 xl:w-1/4'>
                    <h3 className='text-lg font-semibold mb-4'>Get in Touch</h3>
                    <ul className='space-y-2 text-gray-400 text-sm'>
                        <li><span className='font-bold text-white'>Phone:</span> (+92)-331-343-9802</li>
                        <li><span className='font-bold text-white'>Email:</span> enchaniquejewelio@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className='absolute bottom-0 bg-black bg-opacity-90 w-full lg:h-[60px] flex flex-col justify-center items-center text-gray-500 text-sm'>
                <p>© 2025 Enchantique Jewelio. All rights reserved.</p>
                <p className="text-gray-400">Developed by <a href="https://webweavers.com" className="text-white hover:underline">WebWeavers</a></p>
            </div>
        </div>
    )
}

export default Footer
