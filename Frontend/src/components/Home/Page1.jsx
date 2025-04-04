import React, { useRef, useState } from 'react'
import Page1Button from '../cards/Page1Button'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TiltText from '../cards/TiltText'
import Navbar from '../inputs/Navbar'

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
        <div  className='relative shadow-2xl p-24 shadow-gray-700 h-full bg-cover w-full rounded-[30px] bg-gray-300'>
          <div className='h-96 w-[45%] mt-6 absolute 
          bg-[url(https://smashinglogo.com/static/img/illustrations/logo-builder.webp)] bg-cover'>
          </div>
        <Navbar userInfo={userInfo}/>  
        <TiltText abc={tiltRef} />
        <Page1Button/>
     </div>
    </div>
  )
}

export default Page1