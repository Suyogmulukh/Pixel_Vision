import React, { useEffect, useState } from "react";
import { motion } from "motion/react"
import ImageSlider from "../cards/ImageSlider";

const Page4 = () => {
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pagePosition = document.querySelector('.text-white').getBoundingClientRect().top;
      if (pagePosition < window.innerHeight && !hasViewed) {
        setHasViewed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasViewed]);

  return (
    <div className=" text-white h-[500px] flex flex-col relative  w-screen bg-gray-300">
      <motion.div
        className="bg-black mt-20 h-[400px] w-80 absolute ml-[135px] rounded-3xl hover:bg-gray-800 border-4 border-solid border-gray-600"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.3 ,delay: 1}}
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1 }}
      >
        <h2 className=" absolute mt-[254px] ml-12 font-medium text-2xl">Unblur & Sharpener</h2>
        <p className="absolute mt-[290px] ml-8 font-light text-gray-400">Remove any motion blur, camera shake, or focus issues, and make your images and videos look sharp and clear.</p>
      </motion.div>
      <motion.div
        className="bg-black mt-20 h-[400px] w-80 absolute ml-[615px] rounded-3xl hover:bg-gray-800 border-4 border-solid border-gray-600"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, delay: 1.2}}
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1 }}
      >
        <h2 className=" absolute mt-[254px] ml-12 font-medium text-2xl ">Old Photos Restorer</h2>
        <p className="absolute mt-[290px] ml-8 font-light text-gray-400 ">Bring your blurred, faded, and damaged photos back to life, making them clearer and more vibrant than ever before.</p>
      </motion.div>
      <motion.div
        className="bg-black mt-20 h-[400px] w-80 absolute ml-[71%] rounded-3xl border-4 border-solid border-gray-700 hover:bg-gray-600"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.7, delay: 1.3}}
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1 }}
      >
        <h2 className=" absolute mt-[254px] ml-12 font-medium text-2xl">Denoiser</h2>
        <p className="absolute mt-[290px] ml-8 font-light text-gray-400">Clean up every pixel in your photo, eliminating grain and noise to get a clear and sharp image that captures every detail.</p>
      </motion.div>
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-12 absolute ">
        <ImageSlider/>
      </div>
    </div>
  );
}
export default Page4;