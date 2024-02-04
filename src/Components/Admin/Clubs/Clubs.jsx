import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { Alert, Avatar, Modal, Tooltip } from 'flowbite-react'
import { MdBlockFlipped } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { HiInformationCircle } from 'react-icons/hi';
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Clubs() {
  document.title = "All Clubs | Placement App";
  const [clubs, setClubs] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [Warning, setWarning] = useState([false, ""])
  const [Success, setSuccess] = useState([false, ""])
  const [data, setdata] = useState({
    cid: "",
    docs: "",
    email: "",
    founder: "",
    logo: "",
    name: "",
    statement: "",
    about: "",
    carousel: {},
    news: {},
    status: true,
  })

  const AllData = async () => {
    const send = await fetch("https://psa-server.vercel.app/admin/clubs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const { msg } = await send.json();
    if (msg.length > 0) {
      setClubs(msg);
    }
  };

  const Disable = async (cid, blocked) => {
    const send = await fetch("https://psa-server.vercel.app/admin/disable_club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        cid,
        blocked
      }),
    });
    const res = await send.json();
    if (res.updated) {
      setWarning([false, ""])
      setSuccess([true, res.msg])
      setOpenModal(false)
      AllData()
    } else {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    }
  }
  const Activate = async (cid) => {
    const send = await fetch("https://psa-server.vercel.app/admin/activate_club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        cid,
      }),
    });

    const res = await send.json();
    if (res.updated) {
      setWarning([false, ""])
      setSuccess([true, res.msg])
      setOpenModal(false)
      AllData()
    } else {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    }
  }
  useEffect(() => {
    AllData();
  }, [data]);


  return (
    <section className="bg-gray-50 dark:bg-gray-900 px-3 sm:px-5" style={{ paddingTop: 80 }}>
      <div className="flex justify-center item-center pb-5 ">
        {Success[0] ? <Alert color="success" icon={CiCircleCheck} className="mx-4 shadow">
          <span>
            <p>
              <span className="font-medium">{Success[1]}</span>
            </p>
          </span>
        </Alert> : ""}
      </div>
      <Modal className="mt-7" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{data.name}</Modal.Header>
        <Modal.Body>
          <div className="flex justify-center item-center">

            {Warning[0] ? <Alert color="failure" icon={HiInformationCircle} className="mx-4 shadow">
              <span>
                <p>
                  <span className="font-medium">{Warning[1]}</span>
                </p>
              </span>
            </Alert> : ""}
          </div>

          <div className="flex w-full">
            <div style={{ width:200}}>
              <img className="rounded" src={`https://psa-server.vercel.app/admin/clublogo/${data.logo}`} />
            </div>
            <div className="ml-2">
              <h5 className="text-sm text-gray-500 font-bold">Founder</h5>
              <h5 className="text-md">{data.founder}</h5>
              <h5 className="text-sm text-gray-500 font-bold">Email</h5>
              <h5 className="text-md">{data.email}</h5>
              <h5 className="text-sm text-gray-500 font-bold">Club ID</h5>
              <h5 className="text-md">{data.cid}</h5>
              <h5 className="text-sm text-gray-500 font-bold">Status</h5>
              <h5 className="text-md">{data.status ? "Active" : "Deactive"}</h5>
            </div>
          </div>
          <h5 className="text-sm text-gray-500 font-bold mt-4">Verified Documents</h5>
          <div className="flex justify-center w-full">
            <Tooltip content="click to view in large size" >
              <img className="rounded" src={`https://psa-server.vercel.app/admin/clubverificationdocs/${data.docs}`} width={250} />
            </Tooltip>
          </div>

          <h5 className="text-sm text-gray-500 font-bold mt-4">Tagline</h5>
          <h5 className="text-md text-justify">{data.about}</h5>
          <h5 className="text-sm text-gray-500 font-bold mt-4">Statement</h5>
          <h5 className="text-md text-justify">{data.statement}</h5>
          <h5 className="text-sm text-gray-500 font-bold mt-4">Carousel</h5>
          {
            data.carousel.img == null ? <h5 className="text-md">No carousel</h5> : <div>
              <div className="flex justify-end">
                <h5 className="text-xs text-white bg-black max-w-fit px-3 py-1">{data.carousel.approved}</h5>
              </div>
              <div className="flex justify-center">
                <img className="rounded" src={`https://psa-server.vercel.app/myclub/carousel/${data.carousel.img}`} style={{ height: 200 }} />
              </div>
              <h5 className="text-sm text-gray-500 font-bold mt-4 mx-4">Carousel Proposal</h5>
              <h5 className="text-sm text-justify mx-4">{data.carousel.content}</h5>
            </div>
          }
          <h5 className="text-sm text-gray-500 font-bold mt-8">News</h5>
          {
            data.news.head == null ? <h5 className="text-md">No News</h5> : <div>
              <div className="flex justify-end">
                <h5 className="text-xs text-white bg-black max-w-fit px-3 py-1">{data.news.approved}</h5>
              </div>

              <h5 className="text-sm text-gray-500 font-bold mx-4">Headine</h5>
              <h5 className="text-sm text-justify mx-4">{data.news.head}</h5>
              <h5 className="text-sm text-gray-500 font-bold mx-4">Description</h5>
              <h5 className="text-sm text-justify mx-4">{data.news.description}</h5>
              <h5 className="text-sm text-gray-500 font-bold mx-4">Link</h5>
              {
                data.news.link !== "" ? <h5 className="text-sm text-justify mx-4">No link</h5> : <Tooltip className="text-sm flex items-center mx-4"><FaExternalLinkAlt className="mr-2" />{data.news.link}</Tooltip>
              }
              <h5 className="text-sm text-gray-500 font-bold mx-4">News Proposal</h5>
              <h5 className="text-sm text-justify mx-4">{data.news.content}</h5></div>
          }
        </Modal.Body>
        <Modal.Footer>
          {!data.status ?
            <button className="bg-green-400 flex items-center px-2 py-1 text-sm text-white rounded" onClick={() => Activate(data.cid)}>
              <FaEnvelopeOpenText className="mr-1" />
              Activate
            </button> : <button className="bg-yellow-400 flex items-center px-2 py-1 text-sm text-white rounded" onClick={() => Disable(data.cid, true)}>
              <MdBlockFlipped className="mr-1" /> Blocked
            </button>
          }
          <button className="bg-red-600 flex items-center px-2 py-1 text-sm text-white rounded ml-2" onClick={() => Disable(data.cid, false)}>
            <IoIosRemoveCircle className="mr-1" />
            Remove
          </button>
        </Modal.Footer>
      </Modal>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
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
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filter
                  <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                  <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                    <li className="flex items-center">
                      <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft (16)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor (49)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label htmlFor="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon (12)</label>
                    </li>
                    <li className="flex items-center">
                      <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                      <label htmlFor="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ (74)</label>
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  clubs.map((e, i) => {
                    return (
                      <tr key={i} className="cursor-pointer" onClick={() => { setOpenModal(true); setdata(e) }}>
                        <td
                          className="border px-2"
                        >
                          <div className="flex justify-center" style={{ width: 150 }} >
                            <img className="rounded" src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`} />
                          </div>
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
                          {e.status ? "Active" : "Deactive"}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            {clubs.length <= 0 ? <h5 className="w-full text-center p-10 text-gray-600 ">No records found</h5> : null}

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
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
