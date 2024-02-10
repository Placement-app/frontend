import React, { useContext, useEffect, useState } from "react";
import announcement from '../../../assets/img/announcement.png'
import events from '../../../assets/img/events.png'
import { UserContext } from "../../../Context/UserContext";
import { Modal } from "flowbite-react";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function HomeNews() {
  const { News } = useContext(UserContext)
  const [OpenModal, setOpenModal] = useState({ data: {}, open: false })
  return (
    <div className="h-84 overflow-hidden lg:max-w-xl w-full">
      <Modal show={OpenModal.open} onClose={e => setOpenModal({ data: {}, open: false })}>
        <Modal.Header>
          {OpenModal.data.head}
        </Modal.Header>
        <Modal.Body>
          {OpenModal.data.description}
          {
            OpenModal.data.link ?
              <div onClick={e=>window.location.replace(OpenModal.data.link)} className="mt-10 flex items-center cursor-pointer underline text-blue-600">
                <FaExternalLinkAlt className="mr-4" />
                {OpenModal.data.link}
              </div> : <div></div>
          }
          <div className="bg-black px-3 py-1 text-white my-4 cursor-pointer" style={{maxWidth:"fit-content"}}>
            view club
          </div>
        </Modal.Body>
      </Modal>

      <h1 className="text-2xl font-bold p-4 font-extrabold text-xl sm:text-4xl flex justify-center items-center"><img src={announcement} style={{ width: 40, marginRight: 10 }} alt="" />Announcement</h1>
      <ul className="overflow-y-scroll h-full remcroll  mx-2 pb-2">
        {News.map(({ news, logo, cid }) => {

          return (
            <li
              key={cid}
              className="mt-2 mb-2 border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              onClick={e => { setOpenModal({ data: news, open: true }) }}
            >
              <div className="flex items-center">
                <div style={{ width: 100 }}>
                  <img src={`http://192.168.1.35:5000/admin/clublogo/${logo}`} alt="" />
                </div>
                <div className="w-full">
                  <h2 className="text-sm md:text-lg font-semibold">
                    {news.head.slice(0, 35)}...
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 ">
                    {news.date !== null ? news.date.split("T")[0] : null}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    {news.description.slice(0, 80)}...
                  </p>

                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
