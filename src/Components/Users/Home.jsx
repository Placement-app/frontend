import React, { useEffect, useState } from 'react'
import HomeCarousel from './Home/HomeCarousel';
import HomeNews from './Home/HomeNews';
import HomeEvents from './Home/HomeEvents';
import ClubCards from './Home/ClubCards';
import inst from "../../assets/img/inst.png"
import { HiArrowNarrowRight } from 'react-icons/hi';
import { IoIosArrowUp } from "react-icons/io";

export default function Home() {

  useEffect(() => {
    document.title = "Home | Placement App";
  }, [])

  return (
    <div>
      <div className="launcher h-[100vh] sm:bg-top">
        <div className='h-full px-10 pt-[-10vh] sm:pt-0 flex flex-col justify-center items-center'>
          <h2 className="text-white font-extrabold text-center text-4xl mb-3">Start buildng your carrier.</h2>
          <h5 className="text-white  text-black text-md font-bold text-center mb-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
          </h5>
          <button onClick={e => document.getElementById("main").scrollIntoView({ behavior: "smooth" })} className='text-xs sm:text-sm text-white bg-black px-4 py-2'>Explore Now</button>
        </div>
        <IoIosArrowUp style={{ width: 20, height: 20, color: "white" }} class="down-arrow" onClick={e => document.getElementById("main").scrollIntoView({ behavior: "smooth" })} />
        <div id='main'>
        </div>
      </div>
      <HomeCarousel />
      <div className='h-64 flex items-center  m-8 mt-20 lg:m-28'>
        <div className='w-1/2 flex flex-col justify-center items-center' style={{ zIndex: 2 }}>
          <div className='z-5' >
            <h2 className="text-xl font-extrabold text-center sm:text-4xl mb-3">Build your passion.</h2>
            <h5 className="text-sm text-black sm:text-md font-bold text-center mb-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
            </h5>
          </div>
          <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2'>Explore Now</button>
        </div>
        <img src={inst} alt="" className='absolute sm:relative w-96 lg:w-1/2 lg:mt-10' />
      </div>
      <div className="px-4 mt-20">
        <div className="container mx-auto rounded-md flex flex-col md:flex-row justify-center">
          <HomeNews />
          <HomeEvents />
        </div>
        <div className="flex justify-center w-full">
          <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2 flex items-center'>
            Learn More
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </button>
        </div>
      </div>
      <div className='mt-10'>
        <ul className='grid p-10 w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'>
          <li className='font-bold shadow-md border rounded-md cursor-pointer bg-black text-xs text-gray-400 flex flex-col items-center w-full p-5 m-1'>STUDENTS PLACED<span className='text-white text-2xl sm:text-4xl  m-3'>14898+</span></li>
          <li className='font-bold shadow-md border rounded-md cursor-pointer bg-black text-xs text-gray-400 flex flex-col items-center w-full p-5 m-1'>ACTIVE CLUBS   <span className='text-white text-2xl sm:text-4xl  m-3'>43+</span></li>
          <li className='font-bold shadow-md border rounded-md cursor-pointer bg-black text-xs text-gray-400 flex flex-col items-center w-full p-5 m-1'>EVENTS         <span className='text-white text-2xl sm:text-4xl  m-3'>16+</span></li>
          <li className='font-bold shadow-md border rounded-md cursor-pointer bg-black text-xs text-gray-400 flex flex-col items-center w-full p-5 m-1'>HACKATHONS     <span className='text-white text-2xl sm:text-4xl  m-3'>149+</span></li>
          <li className='font-bold shadow-md border rounded-md cursor-pointer bg-black text-xs text-gray-400 flex flex-col items-center w-full p-5 m-1'>BOOTCAMPS          <span className='text-white text-2xl sm:text-4xl  m-3'>184+</span></li>
          <li className='font-bold shadow-md border rounded-md cursor-pointer bg-black text-xs text-gray-400 flex flex-col items-center w-full p-5 m-1'>PROJECTS       <span className='text-white text-2xl sm:text-4xl  m-3'>178+</span></li>
        </ul>
      </div>
      <ClubCards />
    </div>

  )
}
