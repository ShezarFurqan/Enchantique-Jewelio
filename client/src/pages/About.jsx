import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='xl:px-24'>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={"us"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Enchantique Jewelio, where elegance meets craftsmanship. We specialize in creating stunning, high-quality jewelry that tells a story of beauty, sophistication, and timelessness. With a passion for design and an eye for detail, our team of skilled artisans handcraft each piece using the finest materials, ensuring that every creation is a masterpiece.</p>
          <p>Whether you're looking for a special gift, a personal statement piece, or something to mark a milestone in your life, we are here to help you find exactly what you need. Our collection ranges from classic designs to modern, bold statements, and each piece is crafted to add a touch of luxury to your everyday style.</p>
          <p>At Enchantique Jewelio, we believe jewelry is more than just an accessory—it's a reflection of your personality and memories. We are proud to be a trusted source of timeless treasures that will be cherished for years to come.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>-
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Craftsmanship:</b>
          <p className='text-gray-600'>Our artisans combine traditional techniques with modern designs, ensuring each piece is crafted to the highest standards. From the intricate details to the finishing touches, quality is at the heart of everything we create.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Premium Materials:</b>
          <p className='text-gray-600'>We use only the finest materials, including ethically sourced gemstones, precious metals, and diamonds, ensuring that each piece is not only beautiful but durable and long-lasting.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Personalized Service:</b>
          <p className='text-gray-600'>We understand that jewelry is deeply personal, and our team is dedicated to helping you find or design the perfect piece. Whether you're customizing an engagement ring or selecting a gift, we work closely with you to ensure it’s exactly what you envision.</p>
        </div>
      </div>
    </div>
  )
}

export default About



