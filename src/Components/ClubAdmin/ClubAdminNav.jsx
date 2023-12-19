import { Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ClubAdminNav() {
  const [shownav, setShownav] = useState(true);
  const location = useLocation();
  const [cookie, setCookie] = useCookies(["CAAUAT"]);
  const [Name, setName] = useState(["", ""]);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const check = async () => {
    const getUser = await fetch("http://localhost:5000/myclub/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.CAUAT }),
    });
    const {msg,founder,email} = await getUser.json();
  
    if (msg == "Access granted") {
      setName([founder.slice(0, 2), founder]);
      setEmail(email);
    }else{
      navigate('/myclub/login')
    }
  };
  const signOut = async () => {
    const logout = setCookie("CAAUAT", null);
    navigate("/admin/login")
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
        <div className="z-12 bg-black flex items-center justify-between">
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
          <div className="mx-4">
            <Dropdown
              arrowIcon={false}
              inline
              className="bg-black border-2 m-2 mx-4"
              label={
                // <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                <div className="w-10 h-10 mx-1 bg-white rounded-lg flex justify-center items-center">
                  <h1 className="text-md font-bold">{Name[0].toUpperCase()}</h1>
                </div>
              }
            >
              <Dropdown.Header className="border-none ">
                <span className="block text-md text-white">{Name[1]}</span>
                <span className="block truncate text-sm font-medium text-white">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="text-white hover:text-black">
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item className="text-white hover:text-black">
              My Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-white hover:text-black">
                My Club
              </Dropdown.Item>
              <Dropdown.Item
                className="text-white hover:text-black"
                onClick={signOut}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div
          className={`absolute z-10 bg-black ${
            isOpen ? "-left-0" : "-left-64"
          }`}
        >
          <div className={"min-h-screen w-64 p-4"}>
            <div>
              <h2 className="text-white font-bold pl-2 pt-2 text-2xl">
                  {Name[1]}
              </h2>
              <h3 className="bg-white w-max ml-2 text-xs px-2">Club Admin</h3>

            </div>
            <ul className="mt-3">
              <li className="text-white p-2 rounded">
                <Link to="/myclub" onClick={e=>{setIsOpen(false)}}>Dashboard</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/myclub" onClick={e=>{setIsOpen(false)}}>Members</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/myclub" onClick={e=>{setIsOpen(false)}}>Add Trending</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/myclub" onClick={e=>{setIsOpen(false)}}>Add News</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/myclub/addcarousel" onClick={e=>{setIsOpen(false)}}>Add Carousel</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/events" onClick={e=>{setIsOpen(false)}}>Club Events</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/settigs" onClick={e=>{setIsOpen(false)}}>Settings</Link>
              </li>
              <li className="text-white p-2 rounded">
                <Link to="/users" onClick={e=>{setIsOpen(false)}}>Users</Link>
              </li>
              {/* Add more navigation items as needed */}
            </ul>
          </div>
        </div>
      </>
    );
  } else {
    return "";
  }
}
