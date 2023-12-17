import React from 'react'
import { Route } from 'react-router-dom'
import ClubAdminLogin from '../Components/ClubAdmin/ClubAdminLogin'
import ClubHome from '../Components/ClubAdmin/ClubHome'
import RequestCarousel from '../Components/ClubAdmin/RequestCarousel'

export default function ClubRoutes() {
  return (
    <>
    <Route element={<ClubHome/>} path='/myclub'/>
    <Route element={<ClubAdminLogin/>} path='/myclub/login'/>
    <Route element={<RequestCarousel/>} path='/myclub/addcarousel'/>
    {/* <Route element={<Clubs/>} path='/myclub'/> */}
    {/* <Route element={<News/>} path='/club/admin/news'/> */}
    </>
    
  )
}
