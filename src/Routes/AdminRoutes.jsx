import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Components/Admin/AdminHome'
import Login from '../Components/Admin/AdminLogin'
import Signup from '../Components/Admin/AdminSignup'
import Clubs from '../Components/Admin/Clubs'
import News from '../Components/Admin/News'

export default function AdminRoutes() {
  return (
    <>
    <Route element={<Home/>} path='/admin/'/>
    <Route element={<Login/>} path='/admin/login'/>
    <Route element={<Signup/>} path='/admin/signup'/>
    <Route element={<Clubs/>} path='/admin/clubs'/>
    <Route element={<News/>} path='/admin/news'/>
    </>
    
  )
}
