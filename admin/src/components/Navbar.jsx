import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='w-[max(10%,80px)] overflow-hidden leading-6 text-3xl font-semibold m-1'>
          <h1 className=''>Enchantique</h1>
          <p className='text-[#C586A5]'>Jewelio</p>
        </div>
        <button onClick={()=>setToken('') } className='bg-gray-600 text-white px-5  py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
