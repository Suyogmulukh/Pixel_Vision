import { useState } from "react";
import LOGO from '../../assets/logo.svg'
import Headers from '../cards/Header'
import {useNavigate} from "react-router-dom"
import 'remixicon/fonts/remixicon.css'

const Navbar = ({ userInfo }) => {

    const [isOpen, setIsOpen] = useState(false);
  const isToken = localStorage.getItem("token")
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.clear()
    navigate ("/user-login")
  }
  
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  }

  return (
    <div className=' flex items-center justify-between drop-shadow-xl relative -top-16 w-[104%] '>
      <img src={LOGO} alt='pixel Vision' className=' h-14 bg-transparent -top-24'/>
      {isToken && <Headers userInfo = {userInfo} onLogout={onLogout}/>}

      <div className=" flex items-center justify-around absolute gap-12 ml-96">
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-gray-600 font-semibold hover:text-blue-400 font-[anzo] text-xl relative ml-16">
        Enhance <i className="ri-arrow-down-s-line"></i>
      </button>

      {isOpen && (
        <div className="absolute top-full w-64 bg-gray-600 text-white rounded-3xl shadow-lg py-2 px-4">
          {[
            { name: "Unblur & Sharpener", path: "/unblur-sharpener" },
            { name: "Denoiser", path: "/denoiser" },
            { name: "Old Photos Restorer", path: "/old-photos-restorer" },
            { name: "Image Enlarger", path: "/image-enlarger" },
            { name: "Color Fixer", path: "/color-fixer" },
            { name: "Face Enhancer", path: "/face-enhancer" },
            { name: "Background Enhancer", path: "/background-enhancer" },
          ].map((item, index) => (
            <a 
              key={index} 
              onClick={() => handleNavigation(item.path)} 
              className="block px-4 py-2 hover:bg-gray-800 transition cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
    <button className="text-gray-600 font-semibold hover:text-blue-400 font-[anzo] text-xl relative">
        AI Photos
      </button>
      <button className="text-gray-600 font-semibold hover:text-blue-400 font-[anzo] text-xl relative">
       Support
      </button>
    </div>
      </div>
  )
}

export default Navbar