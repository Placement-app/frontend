import { Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Nav() {
  const [shownav, setShownav] = useState(true);
  const location = useLocation();
  const [cookie, setCookie] = useCookies(["PAUAT"]);
  const [Name, setName] = useState(["",""])
  const [email, setEmail] = useState("")
  
  const check = async () => {
    const getUser = await fetch("https://psa-server-placement-system-application.vercel.app/user/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.PAUAT }),
    });
    const { msg,name,email } = await getUser.json();

    if (msg == "Access granted") {
      setName([name.slice(0,2),name])
      setEmail(email)
    }
  };

  const signOut=async()=>{
    const logout = setCookie('PAUAT',null)
}

  useEffect(() => {
    if (location.pathname == "/signup" || location.pathname == "/login") {
      setShownav(false);
    } else {
      setShownav(true);
    }

    check();
  }, [location]);
  if (shownav) {
    return (
      <div className="w-full absolute z-10">
      <Navbar fluid className="bg-black">
        <Navbar.Brand href="https://flowbite-react.com">
          {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
            PLACE APP
          </span>
        </Navbar.Brand>
        {cookie.PAUAT ? (
          <div className="flex md:order-2 shadow-lg">
            <Dropdown
              arrowIcon={false}
              inline
              className="bg-black border-2 mt-2"
              label={
                // <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                <div className="w-10 h-10 mx-1 bg-white rounded-lg flex justify-center items-center">
                  <h1 className="text-md font-bold">{Name[0].toUpperCase()}</h1>
                </div>
              }
            >
              <Dropdown.Header className="border-none">
                <span className="block text-md text-white">{Name[1]}</span>
                <span className="block truncate text-sm font-medium text-white">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item className="text-white hover:text-black">Dashboard</Dropdown.Item>
              <Dropdown.Item className="text-white hover:text-black">Settings</Dropdown.Item>
              <Dropdown.Item className="text-white hover:text-black">My Cubs</Dropdown.Item>
              <Dropdown.Item className="text-white hover:text-black" onClick={signOut}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : <Navbar.Toggle />}
        {cookie.PAUAT ? (
          <Navbar.Collapse>
            <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
              Home
            </Link>
            <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
              All Clubs
            </Link>
            <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
              News
            </Link>
            <Link to="/" className="text-white border-0 mt-8 mb-8 text-center md:mt-0 md:mb-0">
              Trendings
            </Link>
            <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
              About
            </Link>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse>
            <Link to="/" className={"text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0"}>
              Home
            </Link>
            <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
              All Clubs
            </Link>
            <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
            About
            </Link>
            <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
              Pricing
            </Link>
            <Link
              to="/signup"
              className="text-black p-1 px-2 bg-white border-0 text-center mt-8 mb-4 md:mt-0 md:mb-0"
            >
              Sign Up
            </Link>
          </Navbar.Collapse>
        )}
      </Navbar></div>
    );
  } else {
    return "";
  }
}
