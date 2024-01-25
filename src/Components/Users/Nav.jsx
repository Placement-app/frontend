import { Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Nav() {
  const [shownav, setShownav] = useState(true);
  const location = useLocation();
  const [cookie, setCookie] = useCookies(["PAUAT"]);
  const [Name, setName] = useState(["", ""])
  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(true)
  const check = async () => {
    const getUser = await fetch("http://localhost:5000/user/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.PAUAT }),
    });
    const { msg, name, email } = await getUser.json();

    if (msg == "Access granted") {
      setName([name.slice(0, 2), name])
      setEmail(email)
    }
    setLoader(false)

  };

  const signOut = async () => {
    const logout = setCookie('PAUAT', null)
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
      <>

        <div className="w-full fixed z-10" style={{ display: loader ? "none" : null }}>
          <Navbar fluid className="bg-black">
            <Navbar.Brand href="https://flowbite-react.com">
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
