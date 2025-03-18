import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Start from './pages/start'
import UserProtectWrapper from './pages/UserProtectionWrapper'
import UserLogout from './pages/UserLogout'
import UploadImage from './pages/UploadImage'
import EnhancesImage from './pages/enhancesImage' 
import ImageGallery from './pages/imageGallery'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/User-Signup" element={<UserSignup />} />
        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
        <Route path='/user/logout'
          element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
          <Route path='/uploadImage'
          element={
            <UserProtectWrapper>
              <UploadImage />
            </UserProtectWrapper>
          } />
          <Route path='/enhancesImage'
          element={
            <UserProtectWrapper>
              <EnhancesImage />
            </UserProtectWrapper>
          } />
          <Route path='/imageGallery'
          element={
            <UserProtectWrapper>
              <ImageGallery />
            </UserProtectWrapper>
          } />
      </Routes>
    </div>
  )
}

export default App