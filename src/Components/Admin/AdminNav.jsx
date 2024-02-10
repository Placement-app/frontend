import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { MdDashboard } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { MdViewCarousel } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaBuildingShield } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

export default function AdminNav() {
  const [shownav, setShownav] = useState(true);
  const location = useLocation();
  const [cookie, setCookie] = useCookies(["AAUAT"]);
  const navigate = useNavigate()
  const [Name, setName] = useState(["", ""]);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const check = async () => {
    const getUser = await fetch("http://192.168.1.35:5000/admin/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.AAUAT }),
    });
    const { msg, name, email } = await getUser.json();

    if (msg == "Access granted") {
      setName([name.slice(0, 2), name]);
      setEmail(email);
    } else {
      navigate('/admin/login')
    }
  };
  const signOut = async () => {
    const logout = setCookie("AAUAT", null);
    navigate("/admin/login")
  };
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (location.pathname.search("admin") != -1) {
      check();
    }
    if (
      location.pathname == "/admin/signup" ||
      location.pathname == "/admin/login"
    ) {
      setShownav(false);
    } else {
      setShownav(true);
    }
  }, [location.pathname]);
  if (shownav) {
    return (
      <>
        <div className="fixed w-full bg-black flex items-center justify-between" style={{ zIndex: 1000 }}>
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
              Placement App Admin
            </h2>
          </div>
          <div className="mx-4">
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
                All Club
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
              <h2 className="text-white font-bold pl-2 pt-2 text-2xl">
                {Name[1]}
              </h2>
              <h3 className="bg-white w-max ml-2 text-xs px-2">Admin</h3>

            </div>
            <ul className="mt-3">
              <li className="text-white p-2 flex items-center rounded">
                <MdDashboard className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/admin" onClick={e => { setIsOpen(false) }}>Dashboard</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
                <FaBuildingShield className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/admin/clubs" onClick={e => { setIsOpen(false) }}>Clubs</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
                <MdViewCarousel className="mr-2" style={{ width: 24, height: 24 }} />
                <Link to="/admin/carousel" onClick={e => { setIsOpen(false) }}>Carousel</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
                <FaNewspaper className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/admin/news" onClick={e => { setIsOpen(false) }}>News</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
                <MdEventAvailable className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/admin/events" onClick={e => { setIsOpen(false) }}>Events</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
                <CgProfile className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/admin/users" onClick={e => { setIsOpen(false) }}>Users</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
                <FaUsers className="mr-2" style={{ width: 22, height: 22 }} />
                <Link to="/users" onClick={e => { setIsOpen(false) }}>Teams</Link>
              </li>
              <li className="text-white p-2 flex items-center rounded">
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
