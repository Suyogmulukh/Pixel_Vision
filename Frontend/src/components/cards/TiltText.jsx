import React from 'react'

const TiltText = (props) => {
  return (
      <div id='tiltDiv' className='-mt-10' ref={props.abc}>
          <h1 className='text-[3.5vw]  leading-[4vw] uppercase font-[anzo2] text-gray-500'> Improve
          <span className='text-primary font-[anzo4] '> Image<span className='text-gray-600 font-[anzo3] text-3xl absolute'>™</span></span></h1>
          <h1 className='text-[11vw] leading-[8vw] uppercase font-[anzo1] font-extrabold text-gray-700 mr-9'> Enhancer</h1>
          <h1 className='text-[3.5vw] leading-[4vw] uppercase font-[anzo2] text-gray-500'> in seconds. </h1>
    </div>
  )
}

export default TiltText