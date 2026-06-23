import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Navbar = () => {

  const [visible, setvisible] = useState(false)

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('isPromoApplied')
    setToken('')
    setCartItems({})
  }
  return (
    <div>
      <nav className='w-full flex justify-between p-3 pr-10 bg-[#121212] text-white'>
        <Link to={"/"}><h1 className='font-bold text-4xl lg:text-5xl ml-6'>Jewelio</h1></Link>
        <ul className='kanit-semibold hidden md:flex font-normal space-x-4 lg:space-x-7 p-2 text-[18px] lg:text-[20px] '>
          <NavLink className='flex flex-col items-center gap-1' to={'/'}><p>Home</p><hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' /></NavLink>
          <NavLink className='flex flex-col items-center gap-1' to={'/shop'}><p>Shop</p><hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' /></NavLink>
          <NavLink className='flex flex-col items-center gap-1' to={'/women'}><p>Women</p><hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' /></NavLink>
          <NavLink className='flex flex-col items-center gap-1' to={'/men'}><p>Men</p><hr className='w-2/4 border-none h-[1.5px] bg-gray-900 hidden' /></NavLink>         
        </ul>
        <div className='flex items-center text-3xl space-x-2 sm:space-x-4 cursor-pointer'>
          <i onClick={() => { setShowSearch(true) }} className="ri-search-line mt-1"></i>
          <Link to={'/cart'} className='relative '>
            <i className="ri-shopping-bag-line mt-1"></i>
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9.8px]'>{getCartCount()}</p>
          </Link>
          <div className='group relative'>
            <i onClick={() => token ? null : navigate('/login')} className="ri-user-line" alt="" />
            {/* Dropdown Menu */}
            {token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded text-sm'>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
          </div>
          <i onClick={() => { setvisible(true) }} className="ri-menu-2-line md:hidden mr-2"></i>
        </div>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer font-medium'>
              <i className="ri-arrow-right-line rotate-180 text-2xl"></i>
              <p>Back</p>
            </div>
            <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/'>Home</NavLink>
            <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/shop'>Shop</NavLink>
            <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/women'>Women</NavLink>
            <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/men'>Men</NavLink>
            <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/Customize'>Customize</NavLink>
            <NavLink onClick={() => { setvisible(false) }} className='py-2 pl-6 border' to='/about'>About Us</NavLink>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
