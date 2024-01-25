import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Components/Admin/AdminHome'
import Clubs from '../Components/Admin/Clubs/Clubs'
import News from '../Components/Admin/News'
import AdminLogin from '../Components/Admin/AdminLogin'
import AddClubs from '../Components/Admin/Clubs/AddClubs'
import Carousels from '../Components/Admin/Carousels'
import Events from '../Components/Admin/Events'

export default function AdminRoutes() {
  return (
    <>
      <Route element={<Home />} path='/admin/' />
      <Route element={<AdminLogin />} path='/admin/login' />
      <Route element={<Clubs />} path='/admin/clubs' />
      <Route element={<News />} path='/admin/news' />
      <Route element={<AddClubs />} path='/admin/addclub' />
      <Route element={<Carousels />} path='/admin/carousel' />
      <Route element={<Events />} path='/admin/events' />
    </>

  )
}
