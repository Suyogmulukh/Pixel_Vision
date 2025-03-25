import { useState } from "react";
import LOGO from '../../assets/logo.svg'
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";
import { FaHandsHelping } from "react-icons/fa";


const Navbar2 = ({ userInfo }) => {

  const [isOpen, setIsOpen] = useState(false);
  const isToken = localStorage.getItem("token")
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  }

  return (
    <div className=' flex items-center justify-between drop-shadow-xl relative -top-16 w-[104%] '>
      <img src={LOGO} alt='pixel Vision' className=' h-14 bg-transparent -top-24'/>
      {/* <div className='flex items-center justify-around absolute gap-12 ml-80 '>
        <h2 className='text-xl font-semibold ml-20'> Enhances </h2>
        <h2 className='text-xl'>enhances </h2>
        <h2 className='text-xl'>enhances </h2>
      </div> */}
    <div className=" flex items-center justify-around absolute gap-12 ml-96">
    <Link to={"/User-Signup"} className="text-gray-600 font-semibold hover:text-blue-400 font-[anzo] text-xl relative -mt-1 ml-32">
            Help <FaHandsHelping className="relative ml-[47px] -mt-6 text-lg" />
          </Link>
    <Link to={"/User-Signup"} className="text-gray-600 font-semibold hover:text-blue-400 font-[anzo] text-xl relative -mt-1 ">
            Signup <SiGnuprivacyguard className="relative ml-[67px] -mt-6 text-lg"/>
          </Link>
      <Link to={"/user-login"} className="text-gray-600 font-semibold hover:text-blue-400 font-[anzo] text-xl relative ml-2">
            Login
            <CiLogin className="relative ml-[48px] -mt-6" />
          </Link>
    </div>
    </div>
  )
}

export default Navbar2
