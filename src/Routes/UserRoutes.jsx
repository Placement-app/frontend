import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Users/Home'
import Login from '../Components/Users/Login'
import Signup from '../Components/Users/Signup'
import Clubs from '../Components/Users/Clubs'
import Profile from '../Components/Users/Profile'
import { UserProvider } from '../Context/UserContext';
export default function UserRoutes() {
  return (
    <>
      <Route element={<Home />} path='/' />
      <Route element={<Clubs />} path='/clubs' />
      <Route element={<Login />} path='/login' />
      <Route element={<Signup />} path='/signup' />
      <Route element={<Profile />} path='/profile' />
    </>

  )
}
