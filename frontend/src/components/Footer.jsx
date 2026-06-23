import React from 'react'

function Footer() {
  return (
    <>
    <div className='mt-8 w-full bg-black px-8 md:px-[500px]  flex md:flex-row flex-col items-start space-y-4 md:space-y-0 justify-between text-sm md:text-md py-8'>
     <div className='flex flex-col text-white'>
      <p>Featured blogs</p>
      <p>Most Viewed</p>
      <p>Reader's choice</p>
     </div>
     <div className='flex flex-col text-white'>
      <p>Forum</p>
      <p>Support</p>
      <p>Recent Posts</p>
     </div>
     <div className='flex flex-col text-white'>
      <p>Privacy policy</p>
      <p>About us</p>
      <p>Terms and Conditions</p>
      <p>Terms of service</p>
     </div>
    </div>
    <p className='py-2 pb-2 text-center text-white bg-black'>All Rights reserved @OpenPages 2026</p>
    </>
    
  )
}

export default Footer
