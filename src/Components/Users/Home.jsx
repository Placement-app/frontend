import React from 'react'
import HomeCarousel from './Home/HomeCarousel';
import HomeNews from './Home/HomeNews';
import ClubCards from './Home/ClubCards';
import inst from "../../assets/img/inst.png"
export default function Home() {
  document.title = "Home | Placement App";

  return (
    <div>
      <HomeCarousel />
      <div className='h-64 flex items-center  m-8 mt-20 lg:m-28'>
        <div className='w-1/2 flex flex-col justify-center items-center'>
          <div>
            <h2 className="text-xl font-extrabold text-center sm:text-4xl mb-3">Build your passion.</h2>
            <h5 className="text-sm text-black sm:text-md font-bold text-center mb-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
            </h5>
          </div>
          <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2'>Explore Now</button>
        </div>
        <img src={inst} alt="" className='w-52 sm:w-96 lg:w-1/2 lg:mt-10' />
      </div>
      <HomeNews />
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

      <div className="launcher">
        <div className='h-full mx-10 flex flex-col justify-center items-center'>
          <div>
            <h2 className="text-white text-xl font-extrabold text-center sm:text-4xl mb-3">Start buildng your carrier.</h2>
            <h5 className="text-white text-sm text-black sm:text-md font-bold text-center mb-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
            </h5>
          </div>
          <button className='text-xs sm:text-sm text-white bg-black px-4 py-2'>Explore Now</button>
        </div>
      </div>
    </div>

  )
}
