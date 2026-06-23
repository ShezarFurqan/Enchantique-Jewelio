import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const RefShip = () => {
  return (
    <div className='xl:px-24'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'Refund & Shipping'} text2={"Policy"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit dolorum aliquam ea aut impedit quos ex quia repudiandae dignissimos! Possimus quidem unde amet laboriosam. Possimus quo ex quos laborum laudantium?</p>
          <b className='text-gray-800'>Our mission</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius facilis veniam soluta possimus at delectus, alias eveniet iusto, pariatur quia dolorem ex nam temporibus eos est molestias cumque debitis laboriosam? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  )
}

export default RefShip