import React from 'react'
import PixelVisionVideo from '../../assets/PixelVisionVideo.mp4'

const Page3 = () => {
  return (
    <div className=' h-[800px] relative flex items-center justify-center bg-cyan-50 '>
        <img className='absolute h-[95vh] z-40 ' src="/src/assets/Homelaptop.avif" alt="" />
        <video autoPlay loop muted className='h-[90vh] w-[60vw] relative object-cover z-10' src= {PixelVisionVideo}> </video>
        <div className='h-0.5 w-[70%] top-[45%] absolute z-0 bg-gray-400'></div>
        <div className='h-0.5 w-[85%] top-[62%] absolute z-0 bg-gray-400'></div>
        <div className='h-0.5 w-full top-[80%] absolute z-0 bg-gray-400'></div>
    </div>
  )
}

export default Page3