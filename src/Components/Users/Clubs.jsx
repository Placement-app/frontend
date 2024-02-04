import React, { useContext, useEffect, useState } from 'react'
import { Card, Dropdown, TextInput, Rating, Modal, Alert } from 'flowbite-react';
import { IoSearch } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { UserContext } from '../../Context/UserContext';

export default function Clubs() {
    const { Clubs, User } = useContext(UserContext)
    const [OpenModal, setOpenModal] = useState([false])
    const [openAlert, setopenAlert] = useState({ open: false, data: null, color: "" })

    const join = async (cid) => {
        console.log(User._id);
        if (User._id) {
            const getUser = await fetch("https://psa-server.vercel.app/user/joinclub", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({ cid, userId: User._id }),
            });
            const { msg, update } = await getUser.json();
            console.log(msg);
            if (update) {
                setopenAlert({ open: true, color: "success", data: msg })
            } else {
                setopenAlert({ open: true, color: "failure", data: msg })
            }
        } else {
            setopenAlert({ open: true, color: "warning", data: "Login for joing on this club!" })
        }

    }
    const findClub = async (cid, e) => {
        const find = User.clubs.find(e => e.cid == cid)
        console.log(find);
        // Open, data, requested or not
        setOpenModal([true, !!find ? { ...e, mystatus: find.status } : e, !!find])

    }
    useEffect(() => {
        document.title = "Clubs | Place app"
        console.log(OpenModal);
    }, [OpenModal])
    return (
        <>

            <div className='text-center mt-8 font-bold text-2xl md:text-4xl'>
                Learn and Teach on Interesting clubs
            </div>
            <div className='w-full flex justify-center mt-5 mb-10'>
                <TextInput className='w-1/2 mr-2' style={{ boxShadow: "2px 2px 8px -4px black", border: ".5px solid gray" }} type="text" icon={IoSearch} placeholder="Search clubs...." required />

                <Dropdown label="Filter" className='bg-black shadow-2s' style={{ color: "white", backgroundColor: "black", boxShadow: "4px 4px 8px -4px black" }} dismissOnClick={false}>
                    <Dropdown.Item className='text-white hover:text-black flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-3" viewBox="0 0 16 16">
                            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                        </svg>Web devlepemnt</Dropdown.Item>
                    <Dropdown.Item className='text-white hover:text-black flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-3" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v2H2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1V7h1a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m-2 7a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1M12 7v2H4V7z" />
                        </svg>Machine learning</Dropdown.Item>
                    <Dropdown.Item className='text-white hover:text-black flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-3" viewBox="0 0 16 16">
                            <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                            <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                        </svg>Music</Dropdown.Item>
                    <Dropdown.Item className='text-white hover:text-black flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-3" viewBox="0 0 16 16">
                            <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1 2h6a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m3 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />

                        </svg>Dancing</Dropdown.Item>
                    <Dropdown.Item className='text-white hover:text-black flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 -960 960 960" className="mr-1" width="30" height="30"><path d="m586-390.667-104 104Q471.333-276 455.667-276q-15.667 0-26.334-10.667L90.667-625.333Q80-636 80-649.667 80-663.333 90.667-674l103.999-104q10.667-10.666 26.667-12.666 16-2.001 26.667 8.666l338 338q10.666 10.667 10.666 26.667T586-390.667Zm137.334 284-150.001-150 48-48 150 150.001Q781-145 781-130.667q0 14.334-9.667 24-9.666 9.667-24 9.667-14.333 0-23.999-9.667Zm24-506.667q-56 0-94.667-38.666Q614-690.667 614-746.667t38.667-94.666Q691.334-880 747.334-880q55.999 0 94.666 38.667 38.667 38.666 38.667 94.666T842-652q-38.667 38.666-94.666 38.666Z" /></svg>
                        Cricket</Dropdown.Item>
                    <Dropdown.Item className='text-white hover:text-black flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 -960 960 960" className="mr-2" width="25" height="25"><path d="M81.333-513.666q3-48.334 22.334-102.167Q123-669.667 153-711.667q53.667 48 78.834 98.5 25.167 50.501 32.167 99.501H81.333Zm614.666 0q7-49 32-99.334 25-50.333 79.001-98.334 30 41.667 49.333 95.667 19.334 54.001 22.334 102.001H695.999ZM153-249.333Q123-291 103.667-344.5 84.333-398 81.333-446.334h182.668q-7 49-32.167 99-25.167 50.001-78.834 98.001Zm654 0q-54.001-48-79.001-98.001-25-50-32-99h182.668q-3 48-22.334 101.667Q837-291 807-249.333ZM331.667-513.666Q323.667-578.333 294-639q-29.666-60.666-97.667-123.667Q241-806.667 303.5-839t142.834-39.667v365.001H331.667Zm181.999 0v-365.001Q594-871.333 656.833-839q62.834 32.333 107.5 76.333Q696-700 666.166-639.166q-29.833 60.833-37.833 125.5H513.666ZM446.334-81.333q-84.001-7.334-144.667-40.167Q241-154.333 196.333-198.333 264.667-261 294.167-321.334q29.5-60.333 37.5-125h114.667v365Zm67.332 0v-365.001h114.667q8 64.667 37.833 125.167Q696-260.667 764.333-198q-44.666 44-105.833 76.667-61.167 32.666-144.834 40Z" /></svg>
                        Football</Dropdown.Item>
                </Dropdown>
            </div>


            <Modal show={OpenModal[0]} onClose={() => setOpenModal([false])}>
                <Modal.Header>
                    {OpenModal[0] ? OpenModal[1].name : null}
                    <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">4.95 out of 5</p>
                    </Rating>
                </Modal.Header>
                <Modal.Body>
                    {
                        openAlert.open ? <Alert color={openAlert.color} style={{ display: openAlert.open ? null : "none" }}>
                            <h5>{openAlert.data}</h5>
                        </Alert> :
                            null
                    }

                    {
                        OpenModal[0] ? <div className='overflow-y-scroll h-full remcroll'>
                            {/* <div onClick={e => { console.log("me") }}>
                                <FaShareAlt className='cursor-pointer' />
                            </div> */}
                            <div className="flex items-center justify-center w-full">
                                <img
                                    src={`https://psa-server.vercel.app/admin/clublogo/${OpenModal[1].logo}`}
                                    className="mb-3 rounded"
                                    style={{ height: 150 }}
                                />
                            </div>
                            <div className='flex justify-between items-center'>

                            </div>
                            <h5 className="mt-2 text-xs text-gray-400">ABOUT</h5>
                            <h5 className='text-sm'>{OpenModal[1].about}</h5>
                            <div className="mt-2  flex items-center space-x-4">
                                <div className='text-md text-white bg-black rounded px-2 py-1'>
                                    {OpenModal[1].founder.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Founder</p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{OpenModal[1].founder}</p>
                                </div>
                            </div>
                            <h5 className="mt-2 text-xs text-gray-400">MEMBERS</h5>
                            <div className='flex'>
                                <div className='text-md mr-1 text-white bg-black rounded px-2 py-1'>
                                    {OpenModal[1].founder.slice(0, 2).toUpperCase()}
                                </div>
                                <div className='text-md mr-1 text-white bg-black rounded px-2 py-1'>
                                    {OpenModal[1].founder.slice(0, 2).toUpperCase()}
                                </div>
                                <div className='text-md mr-1 text-white bg-black rounded px-2 py-1'>
                                    {OpenModal[1].founder.slice(0, 2).toUpperCase()}
                                </div>
                            </div>
                            <h5 className="mt-4 text-xs text-gray-400">NEWS</h5>
                            <ul className="mx-2 pb-2">
                                {/* {
                                    OpenModal[1].news.map((e, i) => {
                                        return (
                                            <li
                                                key={i}
                                                className="mt-2 mb-2 border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                                                // onClick={e => { news.link !== "" && news.link !== undefined ? window.location.replace(news.link) : null }}
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-full">
                                                        <h2 className="text-sm md:text-lg font-semibold">
                                                            {"OpenModal[1].news.head"}
                                                        </h2>
                                                        <p className="text-xs md:text-sm text-gray-500 ">
                                                            {'news.date !== null ? news.date.split("T")[0] : null'}
                                                        </p>
                                                        <p className="text-xs md:text-sm text-gray-700">
                                                            {'news.description'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                } */}
                            </ul>
                            {
                                OpenModal[2] ?
                                    <button className='bg-yellow-300 text-white p-1 px-3 rounded text-sm'>{OpenModal[1].mystatus}</button>
                                    : <button onClick={e => join(OpenModal[1].cid)} className='bg-black text-white p-1 px-3 rounded text-sm'>Join Club</button>
                            }
                        </div> : null
                    }

                </Modal.Body>
            </Modal>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 '>
                {
                    Clubs.map((e, i) => {
                        return (
                            <div key={i} className='flex justify-center cursor-pointer'>
                                <Card className="w-full border-2 m-2 mx-12 md:mx-2" onClick={ele => { findClub(e.cid, e) }}>
                                    <div className="flex justify-end px-4 pt-2">
                                        <FaShareAlt className='cursor-pointer' />
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                        <img
                                            src={`https://psa-server.vercel.app/admin/clublogo/${e.logo}`}
                                            className="mb-3 rounded"
                                            style={{ height: 150 }}
                                        />
                                    </div>
                                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{e.name}</h5>
                                    <h5 className='text-sm'>
                                        {e.about}
                                    </h5>
                                    <div >
                                        <Rating>
                                            <Rating.Star />
                                            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{i % 2 == 0 ? 3.95 - i / 2 : 3.95 + i / 2} out of 5</p>
                                        </Rating>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className='text-md text-white bg-black rounded px-2 py-1'>
                                            {e.founder.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Founder</p>
                                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">{e.founder}</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    })
                }


            </div>

        </>
    )
}
