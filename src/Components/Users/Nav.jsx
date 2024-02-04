import { Dropdown, Navbar } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Nav() {
  const [shownav, setShownav] = useState(true);
  const location = useLocation();
  const { Name, User, setCookie, cookie } = useContext(UserContext)

  const signOut = async () => {
    const logout = setCookie('PAUAT', null)
  }

  useEffect(() => {
    if (location.pathname == "/signup" || location.pathname == "/login") {
      setShownav(false);
    } else {
      setShownav(true);
    }
  }, [location]);

  if (shownav) {
    return (
      <>
        {/* <div className="w-full fixed z-10" style={{ display: loader ? "none" : null }}> */}
        <div className="w-full fixed z-10">
          <Navbar fluid className="bg-black">
            <Navbar.Brand>
              <Link to="/" className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                SRM Techy
              </Link>
            </Navbar.Brand>
            {cookie.PAUAT ? (
              <div className="flex md:order-2 shadow-lg">
                <Dropdown
                  arrowIcon={false}
                  inline
                  className="bg-black border-2 mt-2"
                  label={
                    <div className="w-10 h-10 mx-1 bg-white rounded-lg flex justify-center items-center">
                      <h1 className="text-md font-bold">{Name.toUpperCase()}</h1>
                    </div>
                  }
                >
                  <Dropdown.Header className="border-none">
                    <span className="block text-md text-white">
                      {User.name}
                    </span>
                    <span className="block truncate text-sm font-medium text-white">
                      {User.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                  <Dropdown.Item>My Cubs</Dropdown.Item>
                  <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
              </div>
            ) : <Navbar.Toggle />}
            {cookie.PAUAT ? (
              <Navbar.Collapse>
                <Link to="/" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
                  Home
                </Link>
                <Link to="/clubs" className="text-white border-0 mt-8 mb-4 text-center md:mt-0 md:mb-0">
                  Clubs
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
                <Link to="/clubs" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  Clubs
                </Link>
                <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  News
                </Link>
                <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  Trendings
                </Link>
                <Link to="/" className="text-white border-0 text-center mt-8 p-1 mb-4 md:mt-0 md:mb-0">
                  About
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
        <div className="pt-12"></div>
      </>
    );
  } else {
    return "";
  }
}
