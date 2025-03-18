import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import PasswordInput from '../components/inputs/PasswardInput'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})
  const [ error, setError ] = useState('') // State for error message
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }
    
    setEmail('')
    setPassword('')

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      setError('Incorrect email or password') // Set error message
    }
  }

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className="login-ui-box right-10 -top-40"/>
      <div className="login-ui-box bg-cyan-200 -bottom-36 right-2/4"/>
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-4/6/12 h-[77vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-3xl text-white font-semibold leading-[40px] mb-5 text-opacity-90">
              Capture  <br/>Your Journeys
            </h4>
            <p className="text-[12px] text-white leading-5 pr-3 -mb-5 text-opacity-90">
              record your travel experiences and memories sd gnfgg <br/> iasubdicfbiewbibic i ecbib
            </p>
          </div>
        </div>
        <div className="w-2/5 h-[68vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <h4 className="text-xl font-semibold mb-9 px-2">Login</h4>
            <input type='text' placeholder='Email' className='input-box'
              value={email}
              onChange={({target})=>{
                setEmail(target.value)
              }}       
            />
            <PasswordInput
              className='input-box'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
            <button
              className='btn-primary'
            >Login</button>
          </form>
          <p className="text-xs text-slate-500 text-center my-4">
            OR
          </p>
          <Link to='/User-signup' 
            className= 'btn-primary btn-light px-[148px]'>
            Create new Account 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin