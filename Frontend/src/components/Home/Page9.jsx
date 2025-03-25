import React from 'react'
import LOGO from '../../assets/logo.svg'
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Page9 = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-400 to-cyan-100 text-white py-12 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Copyright */}
        <div>
          <div className="flex items-center space-x-2">
            <img src={LOGO} alt="Remini" className="w-6 h-6" />
            <span className="text-lg font-semibold text-black">Pixel Vision</span>
          </div>
          <p className="text-gray-800 font-semibold text-sm mt-2">
            © 2024 AI Creativity <br /> All rights reserved.
          </p>
          <button className="mt-10 border border-gray-800 font-semibold px-4 py-1 rounded-full text-gray-800 hover:bg-cyan-200 transition ">
            Your cookies preferences
          </button>
        </div>

        {/* Enhance Section */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-2">Enhance</h3>
          <ul className="text-gray-800 space-y-1">
            {["Unblur & Sharpener", "Denoiser", "Old Photos Restorer", "Image Enlarger", "Color Fixer", "Face Enhancer", "Background Enhancer"].map((item, index) => (
              <li key={index} className="hover:text-cyan-700 cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>

        {/* Generative AI Section */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-2 mr-9">Generative AI</h3>
          <ul className="text-gray-800 space-y-1">
            <li className="hover:text-cyan-700 cursor-pointer">AI Photos</li>
          </ul>
        </div>

        {/* Resources & Legal */}
        <div className="relative grid grid-cols-2 gap-7 ">
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Resources</h3>
            <ul className="text-gray-800 space-y-1 ">
              {["Web help center", "Contact us", "Try Remini", "Careers"].map((item, index) => (
                <li key={index} className="hover:text-cyan-700 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Legal</h3>
            <ul className="text-gray-800 space-y-1">
              {["Privacy & cookie notice", "App privacy notice", "Terms of service"].map((item, index) => (
                <li key={index} className="hover:text-cyan-700 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* CTA Button */}
      <div className="text-center mt-14">
        <h2 className="text-4xl font-bold text-gray-800 font-[anzo3]">Try Remini now!</h2>
        <p className="text-gray-800 mt-6">Join the Remini community today and discover the power of AI technology.</p>
        <Link to={"/user-login"} className="mt-8 px-6 py-3 w-fit ml-[660px] bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md flex items-center gap-2">
          Pixel Vision <FaArrowRightLong />
          </Link>
      </div>
      <div className="hidden"> {/* Hide the purple line */}
        <div className="progress fixed left-0 right-0 h-[5px] bg-purple-900 bottom-[50px] transform scale-x-0 "> </div>
      </div>
    </footer>
  );
}

export default Page9
