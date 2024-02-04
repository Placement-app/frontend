import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { Card, Label } from 'flowbite-react'
import { FaShareAlt } from 'react-icons/fa';
export default function Profile() {
  const { User } = useContext(UserContext)
  console.log(User);
  return (
    <div className='mt-10 mb-10 px-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 mt-2'>
        <div className='flex flex-col w-full px-1'>
          <Label value='Your Name' />
          <div type="text" disabled className='rounded-md shadow bg-gray-100'>{User.name}</div>
        </div>
        <div className='flex flex-col w-full px-1'>
          <Label value='Your Email' />
          <div type="text" disabled className='rounded-md shadow bg-gray-100'>{User.email}</div>
        </div>
        <div className='flex flex-col w-full px-1 mt-2'>
          <Label value='Your Registor No' />
          <div type="text" className='rounded-md shadow bg-gray-100'>{User.regno}</div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-2'>
        <Card className="border-2 m-1">
          <div className="flex justify-end px-4 pt-2">
            <FaShareAlt className='cursor-pointer' />
          </div>
          <div className="flex items-center justify-center w-full">
            {/* <img
                                            height="100"
                                            src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`}
                                            className="mb-3 rounded"
                                            style={{ height: 150 }}
                                        /> */}
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{"e.name"}</h5>
          <div className='text-sm'>
            {"e.about"}
          </div>
          <div >
          </div>
          <div className="flex items-center space-x-4">
            <div className='text-md text-white bg-black rounded px-2 py-1'>
              {"e.founder.slice(0,2).toUpperCase()"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Founder</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{"e.founder"}</p>
            </div>
          </div>
        </Card>
        <Card className="border-2 m-1">
          <div className="flex justify-end px-4 pt-2">
            <FaShareAlt className='cursor-pointer' />
          </div>
          <div className="flex items-center justify-center w-full">
            {/* <img
                                            height="100"
                                            src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`}
                                            className="mb-3 rounded"
                                            style={{ height: 150 }}
                                        /> */}
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{"e.name"}</h5>
          <div className='text-sm'>
            {"e.about"}
          </div>
          <div >
          </div>
          <div className="flex items-center space-x-4">
            <div className='text-md text-white bg-black rounded px-2 py-1'>
              {"e.founder.slice(0,2).toUpperCase()"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Founder</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{"e.founder"}</p>
            </div>
          </div>
        </Card>
        <Card className="border-2 m-1">
          <div className="flex justify-end px-4 pt-2">
            <FaShareAlt className='cursor-pointer' />
          </div>
          <div className="flex items-center justify-center w-full">
            {/* <img
                                            height="100"
                                            src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`}
                                            className="mb-3 rounded"
                                            style={{ height: 150 }}
                                        /> */}
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{"e.name"}</h5>
          <div className='text-sm'>
            {"e.about"}
          </div>
          <div >
          </div>
          <div className="flex items-center space-x-4">
            <div className='text-md text-white bg-black rounded px-2 py-1'>
              {"e.founder.slice(0,2).toUpperCase()"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Founder</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{"e.founder"}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
