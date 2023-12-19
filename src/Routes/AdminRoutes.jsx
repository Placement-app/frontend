import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Components/Admin/AdminHome'
import Signup from '../Components/Admin/AdminSignup'
import Clubs from '../Components/Admin/Clubs/Clubs'
import News from '../Components/Admin/News'
import AdminLogin from '../Components/Admin/AdminLogin'
import AddClubs from '../Components/Admin/Clubs/AddClubs'
import ApproveCarousel from '../Components/Admin/Clubs/ApproveCarousel'
import Carousels from '../Components/Admin/Carousels'
import ApprovedCarousel from '../Components/Admin/Clubs/ApprovedCarousel'

export default function AdminRoutes() {
  return (
    <>
    <Route element={<Home/>} path='/admin/'/>
    <Route element={<AdminLogin/>} path='/admin/login'/>
    <Route element={<Signup/>} path='/admin/signup'/>
    <Route element={<Clubs/>} path='/admin/clubs'/>
    <Route element={<News/>} path='/admin/news'/>
    <Route element={<AddClubs/>} path='/admin/addclub'/>
    <Route element={<Carousels/>} path='/admin/carousel'/>
    <Route element={<ApprovedCarousel/>} path='/admin/approvedcarousel'/>
    <Route element={<ApproveCarousel/>} path='/admin/allcarousel'/>
    </>
    
  )
}
