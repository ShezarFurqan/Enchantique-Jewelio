import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import CategoryCard from '../components/CategoryCard'


const Home = () => {
  return (
    <div>
      <Hero/>
      <CategoryCard/>
      <div className='flex justify-center'>
        <LatestCollection/>
      </div>
      <BestSeller/>
      <OurPolicy/>
      {/* <Cards/> */}
    </div>
  )
}

export default Home
