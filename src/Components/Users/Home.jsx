import React from 'react'
import HomeCarousel from './Home/HomeCarousel';
import HomeNews from './Home/HomeNews';
import ClubCards from './Home/ClubCards';
export default function Home() {
  document.title = "Home | Placement App";

  return (
    <>
      <HomeCarousel/>
      <HomeNews/>
      <ClubCards/>
    </>

  )
}
