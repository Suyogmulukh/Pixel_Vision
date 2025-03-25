import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import PasswordInput from '../components/inputs/PasswardInput'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState('')
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const validateForm = () => {
    if (!email || !password) {
      setError('All fields are required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password
      })
      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
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
          <form onSubmit={submitHandler}>
            <h4 className="text-xl font-semibold mb-9 px-2">Login</h4>
            <input 
              type='email' 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}       
            />
            <PasswordInput
              className='input-box'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              required
              minLength={6}
              placeholder='Password'
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              className='btn-primary'
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
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