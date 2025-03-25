import React, { useRef, useState } from 'react'
import Page2Button from '../cards/Page2Button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TiltText from '../cards/TiltText'
import Navbar2 from '../inputs/Navbar2'

const Page1 = () => {

  const tiltRef = useRef(null)
  const [xVal , setXVal] = useState(0)
  const [yVal , setYVal] = useState(0)
  const [userInfo, setUserInfo] = useState(null)

  const mouseMoving = (e) => {

    setXVal((e.clientX - tiltRef.current.getBoundingClientRect().x - tiltRef.current.getBoundingClientRect().width/2)/50)
    setYVal(-(e.clientY - tiltRef.current.getBoundingClientRect().y - tiltRef.current.getBoundingClientRect().height/2)/15)
 
  }

    useGSAP(function() {
      gsap.to (tiltRef.current,{
        transform : `rotateX(${yVal}deg) rotateY(${xVal}deg)`,
        duration : 1.5,
        ease : 'power4.out'
      })
    },[xVal, yVal])

  return (
    <div id='page1' onMouseMove={(e)=>{
      mouseMoving (e)
    }} 
    className='h-screen p-6 bg-cyan-50 relative'>
        <div id='page1-in' className='relative shadow-2xl p-24 shadow-gray-700 h-full bg-cover w-full rounded-[30px] 
        bg-cyan-100'>
          <div className='h-96 w-[45%] mt-6 absolute 
          bg-[url(https://smashinglogo.com/static/img/illustrations/logo-builder.webp)] bg-cover'>
          </div>
        <Navbar2 userInfo={userInfo} />  
        <TiltText abc={tiltRef} />
        <Page2Button/>
     </div>
    </div>
  )
}

export default Page1