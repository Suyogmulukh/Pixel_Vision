import React, { useState , useContext } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import PasswordInput from '../components/inputs/PasswardInput'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ fullName, setFullName ] = useState('')
  const [ userData, setUserData ] = useState({})


  const navigate = useNavigate()
 const { user, setUser } = useContext(UserDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()

   const newUser = {
      fullname: fullName,
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFullName('')
    setPassword('')
  }

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
    <div className="login-ui-box right-10 -top-40"/>
    <div className="login-ui-box bg-cyan-200 -bottom-36 right-2/4"/>


    <div className="container h-screen flex items-center justify-center px-20 mx-auto">
      <div className="w-4/6/12 h-[77vh] flex items-end bg-SignUp-bg-img bg-cover bg-center rounded-lg p-10 z-50">
        <div>
        <h4 className="text-3xl text-gray-800 font-semibold leading-[45px] mb-5  ">
          Edit <br/> Beautiful Image
        </h4>
        <p className="text-[12px] text-slate-800 leading-5 pr-3 -mb-5 ">
          Create an account to start editing and preserving your<br/> 
          memories in your Beautiful picture...
        </p>
      </div>
      </div>
      <div className="w-2/5 h-[68vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
              <h4 className="text-xl font-semibold mb-9 px-2">SignUp</h4>   
              <input
                required
                className='input-box'
                type="text"
                placeholder='Fullname'
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value)
                }}
              />

            
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='input-box'
              type="email"
              placeholder='email@example.com'
            />

            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />

            <button
              className='btn-primary'>
                Create account
            </button>

          </form>
          <p className="text-xs text-slate-500 text-center my-4">
              OR
              </p>
            <Link to='/User-Login' 
          className='btn-primary btn-light px-[195px]'>
            Login </Link>
        </div>
        </div>
      </div>
  )
}

export default UserSignup
