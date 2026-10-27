import Home  from '../Pages/Home'
import Products from '../Pages/Products'
import ViewMore  from '../Pages/ViewMore'
import NavBar from '../NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const UsersPortal = () => {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route element={<Home/>} path='/'/>
            <Route element={<Products/>} path='/products'/>
            <Route element={<ViewMore/>} path='/viewmore/:id'/>
        </Routes>
    </>
  )
}

export default UsersPortal