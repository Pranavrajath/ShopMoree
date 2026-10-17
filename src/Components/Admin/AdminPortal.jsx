import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Products from '../Pages/Products'
import NavBar from '../NavBar'
import ViewMore from '../Pages/ViewMore'
import AddProduct from '../Pages/AddProduct'

const AdminPortal = () => {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route element={<Home/>} path='/'/>
            <Route element={<Products/>} path='/products'/>
            <Route element={<ViewMore/>} path='/viewmore/:id'/>
            <Route element={<AddProduct/>} path='/addproduct'/>
        </Routes>
    </>
  )
}

export default AdminPortal