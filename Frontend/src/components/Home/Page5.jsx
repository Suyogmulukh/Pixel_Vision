import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Pages5 = () => {
  const dropDownRef = useRef(null); // Ref for drop-down text
  const textRefs = useRef([]); // Refs for all text elements

  useEffect(() => {
    // Drop-down text animation
    gsap.fromTo(
      dropDownRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: dropDownRef.current,
          start: "top 50%", // Changed from 90% to 50%
          end: "top 60%",
          scrub: true,
        },
      }
    );

    // Bouncing text animation
    textRefs.current.forEach((textRef, index) => {
      gsap.fromTo(
        textRef,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.7,
          delay: index * 1.5,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: textRef,
            start: "top 50%", // Changed from 90% to 50%
            end: "top 60%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="bg-cyan-50 text-white h-screen flex items-center justify-center p-8 ">
      <h3 className='text-gray-500 text-xl font-[anzo] ml-12 absolute mb-[40%]'>
        Ⓒsuyog & sahil | designed and developed
      </h3>
      <div className="max-w-5xl flex flex-col md:flex-row items-center gap-28 ml-24">
        {/* AI Generated Image Stack */}
        <div className="relative w-72 h-96">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeIn" , delay: 1.5}}
            className="relative w-64 h-96 bg-gray-700 rounded-2xl rotate-[-20deg] top-28 right-40 shadow-xl 
            bg-[url(https://i.pinimg.com/564x/cf/2f/15/cf2f15be9a1d91f3cd7191614512ba61.jpg)] bg-cover bg-right"
          >
            <span className="absolute text-xs font-serif font-bold top-[360px] text-gray-800 ml-20">AI GENERATED</span>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeIn", delay: 1.7 }}
            className="absolute w-64 h-96 bg-gray-600 rounded-3xl rotate-[-8deg] top-16 right-24 shadow-xl
            bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5QPOdq4i_keODQ-_xCC3Am5A9zFfOpTeI-A&s)] bg-cover"
          >
            <span className="absolute text-xs font-serif font-bold top-[362px] text-gray-800 ml-[97px]">AI GENERATED</span>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeIn", delay: 2 }}
            className="absolute w-64 h-96 bg-gray-500 rounded-3xl rotate-[4deg] top-8 left-12 shadow-xl flex items-center justify-center
            bg-[url(https://images.unsplash.com/photo-1529778873920-4da4926a72c2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center"
          >
            <span className="absolute text-xs font-serif font-bold top-[360px] text-gray-800">AI GENERATED</span>
          </motion.div>
        </div>
        
        {/* Text Content */}
        <div className="text-center md:text-left">
          <span ref={el => textRefs.current[0] = el} className="bg-red-500 text-white font-semibold text-sm px-3 py-1 rounded-full uppercase tracking-wider">New</span>
          <span ref={el => textRefs.current[1] = el} className=" text-purple-700 font-semibold text-sm px-3 py-1 rounded-full uppercase tracking-wider ml-4">AI PHOTOS</span>
          <h1 ref={el => textRefs.current[2] = el} className="text-5xl font-semibold mt-4 text-gray-700">Generate <br/>photos of<br/> yourself, with AI</h1>
          <p ref={el => textRefs.current[3] = el} className="text-gray-700 mt-14 max-w-md font-semibold">
            Get professional-quality photos of yourself with stunning realism, with the help of AI.
          </p>
          {/* Drop-down Text */}
          <div ref={dropDownRef} className="mt-3 text-gray-700 font-semibold">
            Experience the future of photography with AI-generated images.
          </div>
        
          {/* Button */}
          <Link to={"/user-login"} className="mt-14 px-6 py-3 w-56 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md flex items-center gap-2">
            Discover AI Photos
            <span>&#x2192;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pages5;