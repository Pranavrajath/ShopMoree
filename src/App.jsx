import React from 'react'
import LandingPage from './Components/LandingPage'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import AdminPortal from './Components/Admin/AdminPortal'
import UsersPortal from './Components/Users/UsersPortal'

const App = () => {
  return (
    <>
    <Routes>
      <Route element={<LandingPage/>} path = '/'/>
      <Route element={<AdminPortal/>} path='/adminportal/*'/>
      <Route element={<UsersPortal/>} path='/usersportal/*'/>
    </Routes>
    </>
  )
}

export default App