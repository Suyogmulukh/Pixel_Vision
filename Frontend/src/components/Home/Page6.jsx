import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageSlider2 from "../cards/ImageSlider2";

const Page6 = () => {
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pagePosition = document.querySelector('.text-white').getBoundingClientRect().top;
      if (pagePosition < window.innerHeight / 2 && !hasViewed) {
        setHasViewed(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setHasViewed(true);
      } else {
        setHasViewed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasViewed]);

  return (
    <motion.div 
      className=" text-white h-[600px] flex flex-col relative shadow-gray-700 bg-cover w-screen bg-gray-300"
      initial={{ opacity: 0 }}
      animate={hasViewed ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      <motion.div
        className="bg-black mt-20 h-[400px] w-80 absolute ml-[135px] rounded-3xl hover:bg-gray-800 border-4 border-solid border-gray-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1 }}
        drag
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 1.2 }}
      >
        <h2 className=" absolute mt-[254px] ml-12 font-medium text-2xl">Face Enhancer</h2>
        <p className="absolute mt-[290px] ml-8 font-light text-gray-400">Elevate your portraits with enhanced facial detail, creating a natural look that captures the essence of your subjects.</p>
      </motion.div>
      <motion.div
        className="bg-black mt-20 h-[400px] w-80 absolute ml-[615px] rounded-3xl hover:bg-gray-800 border-4 border-solid border-gray-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1 }}
        drag
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.3, delay: 1.3 }}
      >
        <h2 className=" absolute mt-[254px] ml-12 font-medium text-2xl">Color Fixer </h2>
        <p className="absolute mt-[290px] ml-8 font-light text-gray-400">Bring out the full spectrum of colors in your photos, enhancing the tones and creating natural and vivid images.</p>
      </motion.div>
      <motion.div
        className="bg-black mt-20 h-[400px] w-80 absolute ml-[71%] rounded-3xl hover:bg-gray-800 border-4 border-solid border-gray-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.1 }}
        drag
        initial={{ opacity: 0, y: 50 }}
        animate={hasViewed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, delay: 1.4 }}
      >
        <h2 className=" absolute mt-[254px] ml-12 font-medium text-2xl">Image Enlarger</h2>
        <p className="absolute mt-[290px] ml-8 font-light text-gray-400">Upscale your photos and videos increasing the size up to 2x without sacrificing quality, and make every pixel count.</p>
      </motion.div>
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center px-6 py-12 absolute"
        initial={{ opacity: 0 }}
        animate={hasViewed ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 1.4 }}
      >
        <ImageSlider2/>
      </motion.div>
    </motion.div>
  );
}
export default Page6;