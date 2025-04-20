import React  from 'react'
// import Header from '../components/cards/Header'
import Page1 from '../components/Home/Page1'
import Page2 from '../components/Home/Page2'
import Page3 from '../components/Home/Page3'
import Page4 from '../components/Home/Page4'
import Page5 from '../components/Home/Page5'
import Page6 from '../components/Home/Page6'
import Page7 from '../components/Home/Page7'
import Page8 from '../components/Home/Page8'
import Page9 from '../components/Home/Page9'
import UserProtectWrapper from './UserProtectionWrapper'

const Home = () => {

  return (
<UserProtectWrapper>
    <>
    <div >
    {/* <Header /> */}
    <Page1 />
    <Page2/>
    <Page7/>
    <Page4/>
    <Page6/>
    <Page5/>
    <Page8/>
    <Page3/>
    <Page9 />
    </div>
    </>
        </UserProtectWrapper>
  )
}


export default Home