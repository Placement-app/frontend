import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { MdViewCarousel } from "react-icons/md";
import { Card } from 'flowbite-react';
import { FaFireAlt } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { HiOutlineTrendingUp } from "react-icons/hi";
import AdminTimeLine from './Home/AdminTimeLine';
import AdminUsersGraph from './Home/AdminUsersGraph';
import AdminTopClub from './Home/AdminTopClub';
import { RiTeamLine } from "react-icons/ri";

export default function AdminHome() {
  document.title = "Dashboard | Placement App Admin";
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["AAUAT"]);
  const check = async () => {
    const getUser = await fetch("http://localhost:5000/user/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.AAUAT }),
    });
    const { msg } = await getUser.json();
    if (msg != "Access granted") {
      navigate('/admin/login')
    }
  }
  useEffect(() => {
    check()
  }, [])
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <main className="p-4 pt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Card className="">
              <div className='flex items-center'>
                <MdViewCarousel
                  style={{ width: 50, height: 50 }} />
                <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                  49+
                </h5>
              </div>
              <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                Total New Carousles
              </h5>
              <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                View Crousels
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Card>
            <Card className="">
              <div className='flex items-center'>
                <FaFireAlt
                  style={{ width: 40, height: 40 }} />
                <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                  56+
                </h5>
              </div>
              <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                Total New Trendings
              </h5>
              <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                View Trendings
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Card>
            <Card className="">
              <div className='flex items-center'>
                <FaNewspaper
                  style={{ width: 40, height: 40 }} />
                <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                  25+
                </h5>
              </div>
              <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                Total New News feeds
              </h5>
              <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                View News
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Card>
            <Card className="">
              <div className='flex items-center'>
                <HiOutlineTrendingUp
                  style={{ width: 50, height: 50 }} />
                <h5 className="text-2xl ml-3 font-bold text-gray-900 dark:text-white">
                  4+
                </h5>
              </div>
              <h5 className="text-lg  font-bold text-gray-900 dark:text-white">
                Tending Clubs
              </h5>
              <button className='bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                View Clubs
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Card>

          </div>

          <div
          // className="flex "
          >
            <h5 className='text-center text-2xl font-bold mt-6'>Today's Events</h5>
            <AdminTimeLine />
          </div>
          <div className='flex'>
            <AdminUsersGraph />
            <AdminTopClub />
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            <Card className="">
              <div className='flex items-center'>
                <RiTeamLine
                  style={{ width: 40, height: 40 }} />
                <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                  Clubs
                </h5>
              </div>
              <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                Totally there are 20 clubs
              </h5>
              <div className='flex'>

                <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  Add
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                  View
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </Card>
            <Card className="">
              <div className='flex items-center'>
                <RiTeamLine
                  style={{ width: 40, height: 40 }} />
                <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                  Clubs
                </h5>
              </div>
              <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                Totally there are 20 clubs
              </h5>
              <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                View
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Card>
            <Card className="">
              <div className='flex items-center'>
                <RiTeamLine
                  style={{ width: 40, height: 40 }} />
                <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                  Clubs
                </h5>
              </div>
              <h5 className="text-xl ml-3 font-bold text-gray-900 dark:text-white">
                Totally there are 20 clubs
              </h5>
              <button className='mx-2 bg-black sm:h-8 w-full text-white flex justify-center items-center p-2 sm: text-xs text-sm rounded'>
                View
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Card>


          </div>
        </main>
      </div>
    </>

  )
}
