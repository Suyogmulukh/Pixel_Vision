import React from 'react'
import { Link } from 'react-router-dom'

const Page1Button = () => {
  return (
    <div className='absolute left-0 p-10 flex items-end justify-between bottom-0 w-full'>
      <Link to= '/user-login' className=' w-44 h-12 mb-[520px] pl-8 pt-3 bg-black rounded-2xl font-semibold text-gray-100 text-sm  absolute ml-[1250px] hover:bg-gray-700'> TRY Pixel Vision </Link>
        <div className=''>
            <h2  className=' text-xl font-[anzo2] ml-14 text-gray-700'> BRAND DISIGN | WEBSITE DISIGN </h2>
            <h3  className=' text-xl font-[anzo3] ml-14 text-black '> @PIXEL VISION </h3>
        </div>
        <div className='mb-32 mr-28'>
            <h2  className=' text-xl font-[anzo2] text-gray-600'>
            Fix dark images, improve detail, and increase <br/>
            contrast and brightness with our<br/>
            easy image enhancer ...</h2>
        </div>
      <Link to= '/user-login' className=' w-44 h-12 mb-8 pl-10 pt-3 bg-black rounded-2xl text-slate-50 text-sm font-medium absolute ml-[900px] hover:bg-gray-700 '> TRY Pixel Vision </Link>
    </div>
  )
}

export default Page1Button