import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import {Avatar} from 'flowbite-react'
export default function Clubs() {
  document.title = "All Clubs | Placement App";
  const [clubs, setClubs] = useState([])
  const AllData = async () => {
    const send = await fetch("https://psa-server.vercel.app/admin/clubs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const { msg } = await send.json();
    console.log(msg);
    if (msg.length > 0) {
      setClubs(msg);
    }
  };
  useEffect(() => {
    AllData();
  }, []);

  // return (
  //   <div className="p-4 pt-20">
  //     <table className="min-w-full divide-y divide-gray-200">
  //       <thead>
  //         <tr>
  //           <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
  //             Club Logo
  //           </th>
  //           <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
  //             Club ID
  //           </th>
  //           <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
  //             Club Name
  //           </th>
  //           <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
  //             Leader
  //           </th>

  //           <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
  //             Edit
  //           </th>
  //           <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
  //             Delete
  //           </th>
  //         </tr>
  //       </thead>
  //       <tbody className="bg-white divide-y divide-gray-200">
  // {
  //   clubs.length >0 ?clubs.map((e,i)=>{
  //     return (
  // <tr key={i}> 
  //   <td
  //     width={300}
  //     className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
  //   >
  //     <img className="rounded" src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`} height={"100px"} width={150} />
  //   </td>
  //   <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
  //     {e.cid}
  //   </td>
  //   <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
  //     {e.name}
  //   </td>
  //   <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
  //     {e.founder}
  //   </td>
  //   <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
  //     <a href="/tables">Edit</a>
  //   </td>
  //   <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
  //     <a href="/tables">Delete</a>
  //   </td>
  // </tr>
  //     )
  //   })
  // :<tr><td>No CLubs</td></tr>}

  //       </tbody>
  //     </table>
  //     <Link className="text-white bg-black px-3 p-1" to="/admin/addclub">
  //       Add New Club
  //     </Link>
  //   </div>
  // );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5" style={{ paddingTop: 100 }}>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search" required="" />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <Link to={"/admin/addclub"} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                  <MdAdd className="-ml-1 mr-1.5 w-5 h-5" color="gray" />
                  Add Club
                </Link>
                <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                  </div>
                </div>
                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                  </svg>
                  Filter
                  <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                  <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                    <li className="flex items-center">
                      <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label for="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                    Club Logo
                  </th>
                  <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                    Club ID
                  </th>
                  <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                    Club Name
                  </th>
                  <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                    Leader
                  </th>
                  <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                    Reviews
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  clubs.length > 0 ? clubs.map((e, i) => {
                    return (
                      <tr key={i} className="cursor-pointer">
                        <td
                          width={300}
                          className="border px-2 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                        >
                          <img className="rounded" src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`} height={"100px"} width={150} />
                        </td>
                        <td className="text-center border px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {e.cid}
                        </td>
                        <td className="text-center border px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {e.name}
                        </td>
                        <td className="text-center border px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {e.founder}
                        </td>
                        <td className="text-center border px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                          <div className="flex flex-wrap gap-2">
                            <Avatar.Group>
                              <Avatar className="w-10 h-10" img="https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg" rounded stacked />
                              <Avatar className="w-10 h-10" img="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" rounded stacked />
                              <Avatar className="w-10 h-10" img="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" rounded stacked />
                              <Avatar.Counter className="w-10 h-10" total={12} href="#" />
                            </Avatar.Group>
                          </div>
                        </td>
                        <td className="text-center border px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          4.9 ⭐
                        </td>
                      </tr>
                    )
                  })
                    : <tr><td>No CLubs</td></tr>}
              </tbody>
            </table>
          </div>
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">1000</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )

}
