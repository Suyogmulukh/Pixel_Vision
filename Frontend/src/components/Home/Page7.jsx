import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion"; // Corrected import

const Page7 = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden"); // Reset animation when not in view
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 2, y: 0 } // Corrected opacity value
  };

  return (
    <section ref={ref} className=" text-black text-center py-16 px-6 relative shadow-2xl shadow-gray-700 h-full bg-cover w-screen bg-gray-300">
      <h4 className="text-purple-700 text-base tracking-widest mb-4 font-bold">OUR SOLUTIONS</h4>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 1.5 }}
        className="text-7xl font-thin font-[anzo3]"
      >
        Bye-bye blur <span className="inline-block">👋🏼</span>
      </motion.h1>
      <motion.h2
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 1.4, delay: 1}}
        className="text-7xl font-thin mt-2 relative font-[anzo3]"
      >
        Hello <span className="text-blue-700 font-[anzo2]"> High </span>definition
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute left-[595px] bottom-0 w-36 h-1 bg-pink-500 origin-left top-20"
        ></motion.span>
      </motion.h2>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-gray-500 text-xl mt-8 max-w-2xl mx-auto "
      >
        Details, colors, and clarity are instantly enhanced in your photos and videos.
        Your content becomes sharper, more vibrant, and more dazzlingly defined than
        you could even imagine.
      </motion.p>
    </section>
  );
}

export default Page7;