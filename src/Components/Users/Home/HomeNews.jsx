import React from "react";
import announcement from '../../../assets/img/announcement.png'
import events from '../../../assets/img/events.png'
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';

export default function HomeNews() {
  const newsItems = [
    {
      id: 1,
      title: "Breaking News of IEEE CISSC",
      logo: "https://entrepreneurship.ieee.org/wp-content/uploads/2018/08/CIS_logo.png",
      content:
        "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
    {
      id: 2,
      title: "Latest Update",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9l8KUhlm2Vro5iR93z5xvwdJ9rddwlJBptSoldrTIlA&s",
      content: "Here is the latest news update for you.",
    },
    {
      id: 3,
      title: "Breaking News of IEEE CISSC",
      logo: "https://entrepreneurship.ieee.org/wp-content/uploads/2018/08/CIS_logo.png",
      content:
        "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
    {
      id: 4,
      title: "Latest Update",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9l8KUhlm2Vro5iR93z5xvwdJ9rddwlJBptSoldrTIlA&s",
      content: "Here is the latest news update for you.",
    },
    // Add more news items here
  ];
  return (
    <div className="px-4 mt-20">
      <div className="container mx-auto rounded-md flex flex-col md:flex-row justify-center">
        <div className="h-84 overflow-hidden lg:max-w-xl">
          <h1 className="text-2xl font-bold p-4 font-extrabold text-xl sm:text-4xl flex justify-center items-center"><img src={announcement} style={{ width: 40, marginRight: 10 }} alt="" />Announcement</h1>
          <ul className="overflow-y-scroll h-full remcroll  mx-2 pb-2">
            {newsItems.map((item) => (
              <li
                key={item.id}
                className="mt-2 mb-2 border p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div className="w-36">
                    <img src={item.logo} alt="" className="h-10 md:h-14" />
                  </div>
                  <div className="">
                    <h2 className="text-sm md:text-lg font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-700">
                      {item.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:max-w-xl px-6">
          <h1 className="text-2xl font-bold p-4 font-extrabold text-xl sm:text-4xl flex justify-center items-center mt-10 md:mt-0"><img src={events} style={{ width: 36, marginRight: 10 }} alt="" />Events</h1>
          <Timeline>
            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>26 February 2024</Timeline.Time>
                <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                <Timeline.Body>
                  Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                  E-commerce & Marketing pages.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>March 2022</Timeline.Time>
                <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                <Timeline.Body>
                  All of the pages and components are first designed in Figma and we keep a parity between the two versions
                  even as we update the project.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>April 2022</Timeline.Time>
                <Timeline.Title>E-Commerce UI code in Tailwind CSS</Timeline.Title>
                <Timeline.Body>
                  Get started with dozens of web components and interactive elements built on top of Tailwind CSS.
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
      <div className="flex justify-center w-full">
        
        <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2 flex items-center'>
          Learn More
          <HiArrowNarrowRight className="ml-2 h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
