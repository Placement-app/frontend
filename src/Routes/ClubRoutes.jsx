import React from 'react'
import { Route } from 'react-router-dom'
import ClubAdminLogin from '../Components/ClubAdmin/ClubAdminLogin'
import ClubHome from '../Components/ClubAdmin/ClubHome'
import RequestCarousel from '../Components/ClubAdmin/RequestCarousel'
import ResuestNews from '../Components/ClubAdmin/RequestNews'
import RequestEvent from '../Components/ClubAdmin/RequestEvent'

export default function ClubRoutes() {
  return (
    <>
    <Route element={<ClubHome/>} path='/myclub'/>
    <Route element={<ClubAdminLogin/>} path='/myclub/login'/>
    <Route element={<RequestCarousel/>} path='/myclub/carousel'/>
    <Route element={<ResuestNews/>} path='/myclub/news'/>
    <Route element={<RequestEvent/>} path='/myclub/events'/>
    </>
    
  )
}
