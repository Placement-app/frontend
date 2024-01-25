import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { MdDashboard } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { FiTrendingUp } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa6";
import { MdViewCarousel } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaBuildingShield } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaBell } from "react-icons/fa";

export default function ClubAdminNav() {
  const [shownav, setShownav] = useState(true);
  const location = useLocation();
  const [cookie, setCookie] = useCookies(["CAAUAT"]);
  const [Name, setName] = useState(["", ""]);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const signOut = async () => {
    const logout = setCookie("CAAUAT", null);
    navigate("/myclub/login")
  };

  const check = async () => {
    const getUser = await fetch("http://localhost:5000/myclub/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.CAAUAT }),
    });
    const { msg, founder, email } = await getUser.json();
    console.log(msg);
    if (msg == "Access granted") {
      setName([founder.slice(0, 2), founder]);
      setEmail(email);
    } else if (msg == "Account deleted") {
      signOut()

    } else {
      navigate('/myclub/login')
    }
  };


  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    check()
    if (
      location.pathname == "/myclub/login"
    ) {
      setShownav(false);
    } else {
      setShownav(true);
    }

  }, [location.pathname]);
  if (shownav) {
    return (
      <>
        <div className="fixed bg-black flex items-center justify-between w-full" style={{ zIndex: 1000 }}>
          <div className="flex items-center">
            <button className="text-white text-xl m-4" onClick={toggleNav}>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              )}
            </button>
            <h2 className="text-white text-center text-xl">
              Placement App Club Admin
            </h2>
          </div>
          <div className="mx-4 flex justify-center items-center">
            <Dropdown
              arrowIcon={false}
              inline
              className="bg-black border-2 rounded m-2 mx-4"
              label={
                <FaBell color="white" style={{ width: 25, height: 25 }} className="mr-4" />
              }
            >
              <Dropdown.Header className="text-white" >
                <h1 className="font-bold text-xl p-3">Your Notifications</h1>
                <ul style={{ maxWidth: 300, maxHeight: 500, overflow: "auto", }} className="remcroll">
                  <li className="hover:text-black hover:bg-white cursor-pointer p-3 flex items-center rounded">
                    <Avatar style={{ width: 100 }} className="mr-3" img="https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg" />
                    <div>
                      <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, eaque.
                      </h5>
                      <h5 className="text-gray-400">
                        8:21 PM 28 Nov 2023
                      </h5>
                    </div>
                  </li>
                  <li className="hover:text-black hover:bg-white cursor-pointer p-3 flex items-center rounded">
                    <MdViewCarousel style={{ width: 100, height: 50 }} className="mr-3" />
                    <div>
                      <h5>Congarlutaions carousel approved, adipisicing elit. Ratione, eaque.
                      </h5>
                      <h5 className="text-gray-400">
                        2:29 PM 28 Nov 2023
                      </h5>
                    </div>
                  </li>
                  <li className="hover:text-black hover:bg-white cursor-pointer p-3 flex items-center rounded">
                    <div className="p-2 mr-5 bg-white text-black rounded flex justify-center items-center font-bold text-lg">
                      YS
                    </div>
                    <div>
                      <h5>Metting sent, adipisicing elit. Ratione, eaque.
                      </h5>
                      <h5 className="text-gray-400">
                        10:46 AM 28 Nov 2023
                      </h5>
                    </div>
                  </li>
                  <li className="hover:text-black hover:bg-white cursor-pointer p-3 flex items-center rounded">
                    <FaNewspaper style={{ width: 80, height: 50 }} className="mr-5" />
                    <div>
                      <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, eaque.
                      </h5>
                      <h5 className="text-gray-400">
                        8:21 PM 28 Nov 2023
                      </h5>
                    </div>
                  </li>
                  <li className="hover:text-black hover:bg-white cursor-pointer p-3 flex items-center rounded">
                    <div className="p-2 mr-5 bg-white text-black rounded flex justify-center items-center font-bold text-lg">
                      SR
                    </div>
                    <div>
                      <h5>Appoinment of new news feed sent, adipisicing elit. Ratione, eaque.
                      </h5>
                      <h5 className="text-gray-400">
                        11:23 AM 28 Nov 2023
                      </h5>
                    </div>
                  </li>
                  <li className="hover:text-black hover:bg-white cursor-pointer p-3 flex justify-start">
                    <Avatar style={{ width: 100 }} className="mr-3" img="https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg" />
                    <div>
                      <h5>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, eaque.
                      </h5>
                      <h5 className="text-gray-400">
                        8:21 PM 28 Nov 2023
                      </h5>
                    </div>
                  </li>
                </ul>
              </Dropdown.Header>
            </Dropdown>

            <Dropdown
              arrowIcon={false}
              inline
              className="bg-black border-2 m-2 mx-4"
              label={
                <div className="w-10 h-10 mx-1 bg-white rounded-lg flex justify-center items-center">
                  <h1 className="text-md font-bold">{Name[0].toUpperCase()}</h1>
                </div>
              }
            >
              <Dropdown.Header className="border-none">
                <span className="block text-2xl font-bold text-white">{Name[1]}</span>
                <span className="block truncate text-sm font-medium text-white">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="text-white flex hover:text-black">
                <MdDashboard className="mr-2" style={{ width: 22, height: 22 }} />
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item className="text-white flex hover:text-black">
                <CgProfile className="mr-2" style={{ width: 22, height: 22 }} />
                My Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-white flex hover:text-black">
                <FaBuildingShield className="mr-2" style={{ width: 22, height: 22 }} />
                My Club
              </Dropdown.Item>
              <Dropdown.Item
                className="text-white flex hover:text-black"
                onClick={signOut}
              >
                <IoLogOut className="mr-2" style={{ width: 22, height: 22 }} />
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div
          className={`fixed mt-14 z-10 bg-black ${isOpen ? "-left-0" : "-left-64"
            }`}
        >
          <div className={"min-h-screen w-64 p-4"}>
            <div>
              <h2 className="text-black rounded bg-white font-bold text-4xl p-5" style={{ maxWidth: "fit-content" }}>
                {Name[0].toUpperCase()}
              </h2>
              <h2 className="text-white font-bold pl-2 pt-2 text-2xl">
                {Name[1]}
              </h2>
              <h3 className="bg-white w-max ml-2 text-xs px-2">Club Admin</h3>
            </div>
            <ul className="mt-3">
              <li className="text-white p-2 rounded flex items-center">
                <MdDashboard className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/myclub" onClick={e => { setIsOpen(false) }}>Dashboard</Link>
              </li>
              <li className="text-white p-2 rounded flex items-center">
                <RiTeamFill className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/myclub" onClick={e => { setIsOpen(false) }}>Members</Link>
              </li>
              <li className="text-white p-2 rounded flex items-center">
                <FiTrendingUp className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/myclub" onClick={e => { setIsOpen(false) }}>Add Trending</Link>
              </li>
              <li className="text-white p-2 rounded flex items-center">
                <FaNewspaper className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/myclub/news" onClick={e => { setIsOpen(false) }}>Add News</Link>
              </li>
              <li className="text-white p-2 rounded flex items-center">
                <MdViewCarousel className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/myclub/carousel" onClick={e => { setIsOpen(false) }}>Add Carousel</Link>
              </li>
              <li className="text-white p-2 rounded flex items-center">
                <MdEventAvailable className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/myclub/events" onClick={e => { setIsOpen(false) }}>Club Events</Link>
              </li>
              <li className="text-white p-2 rounded flex items-center">
                <IoSettings className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/settigs" onClick={e => { setIsOpen(false) }}>Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return "";
  }
}
