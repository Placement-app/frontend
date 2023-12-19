export default function ClubCards() {
  const clubItems = [
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
      logo: "https://media.licdn.com/dms/image/C560BAQHiGWdWk0452g/company-logo_200_200/0/1643904496732?e=2147483647&v=beta&t=d_E1kQJH8BnDHVBjmtknr3MyH95whASihupb7o7ebmU",
      content:
        "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
    {
      id: 4,
      title: "Breaking News of IEEE CISSC",
      logo: "data:image/png;base64,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",
      content:
        "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },    {
      id: 5,
      title: "Breaking News of IEEE CISSC",
      logo: "https://i.pinimg.com/originals/06/f3/fa/06f3fa367b0debe3aa6eb95f480cfe3c.png",
      content:
        "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
    // Add more news items here
  ];
  return (
    <div className="px-4 mt-12">
      <div className="container mx-auto ">
        <h1 className="text-2xl font-bold p-4">Trending Clubs</h1>
        <div className="grid grid-cols-2 md:grid-cols-5">
          {clubItems.map((e, i) => {
            return (
              <div key={i} className="mx-2 my-4 flex flex-col items-center">
                    <img
                      className="mb-3 rounded-md h-20 "
                      src={e.logo}
                    />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
