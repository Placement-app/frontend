import React, { useContext, useEffect, useState } from "react";
import announcement from '../../../assets/img/announcement.png'
import events from '../../../assets/img/events.png'
import { UserContext } from "../../../Context/UserContext";

export default function HomeNews() {
  const { News } = useContext(UserContext)
  return (
    <div className="h-84 overflow-hidden lg:max-w-xl w-full">
      <h1 className="text-2xl font-bold p-4 font-extrabold text-xl sm:text-4xl flex justify-center items-center"><img src={announcement} style={{ width: 40, marginRight: 10 }} alt="" />Announcement</h1>
      <ul className="overflow-y-scroll h-full remcroll  mx-2 pb-2">
        {News.map(({ news, logo, cid }) => {
          
          return (
            <li
              key={cid}
              className="mt-2 mb-2 border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              onClick={e => { news.link !== "" && news.link !== undefined ? window.location.replace(news.link) : null }}
            >
              <div className="flex items-center">
                <div style={{ width: 100 }}>
                  <img src={`https://psa-server.vercel.app/admin/clublogo/${logo}`} alt="" />
                </div>
                <div className="w-full">
                  <h2 className="text-sm md:text-lg font-semibold">
                    {news.head}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-500 ">
                    {news.date !== null ? news.date.split("T")[0] : null}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700">
                    {news.description}
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
