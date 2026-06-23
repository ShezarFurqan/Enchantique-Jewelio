import React, { useEffect } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/about'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Shop from './pages/Shop'
import Navbar from './components/Navbar'
import TopBar from './components/Topbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Product from './pages/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Men from './pages/Men'
import Women from './pages/Women.Jsx'
import Customize from './pages/Customize'
import RefShip from './pages/RefShip'

const App = () => {

 
  return (
    <div className=''>
      <ToastContainer/>
      {/* <TopBar/> */}
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/Shop' element={<Shop/>} />
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/RefundandShipping' element={<RefShip/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
