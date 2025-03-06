import React from 'react'
import LOGO from '../../assets/logo.svg'
import Headers from '../cards/Header'
import {useNavigate} from "react-router-dom"

const Navbar = ({ userInfo }) => {

  const isToken = localStorage.getItem("token")
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.clear()
    navigate ("/user-login")
  }
  

  return (
    <div className=' flex items-center justify-between drop-shadow-xl relative -top-16 w-[104%]'>
      <img src={LOGO} alt='pixel Vision' className=' h-14 bg-transparent -top-24'/>
      {isToken && <Headers userInfo = {userInfo} onLogout={onLogout}/>}
    </div>
  )
}

export default Navbar