import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Header = ({onLogout}) => {
  return (
    <div className="relative flex items-center gap-4 ">
        <button className=" w-20 h-9 -top-24 bg-black rounded-2xl text-slate-50 text-sm flex items-center justify-center font-medium " onClick={onLogout}>
          Log Out
        </button>
        </div>
  )
}

export default Header