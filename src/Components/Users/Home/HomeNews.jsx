import React from "react";

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
    <div className="px-4 mt-12">
      <div className="container mx-auto border border-gray-300 rounded-md">
        <h1 className="text-2xl font-bold p-4 shadow-md">News Feed</h1>
        <div className="h-72 overflow-hidden">
          <ul className="overflow-y-scroll h-full  mx-2 pb-2">
            {newsItems.map((item) => (
              <li
                key={item.id}
                className="mt-2 mb-2 border p-4 rounded-lg shadow-md "
              >
                <div className="flex items-center">
                  <div className="w-36 ">
                  <img src={item.logo} alt="" className="h-10 md:h-14" />
                  </div>
                  <div className="mx-4">
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
      </div>
    </div>
  );
}
