import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "flowbite/dist/flowbite.css";
import "./App.css";

import Nav from "./Components/Users/Nav";
import AdminNav from "./Components/Admin/AdminNav";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import UserFooter from "./Components/Users/UserFooter";

export default function App() {
  const [HomeNav, setHomeNav] = useState(true);
  useEffect(() => {
    if (location.pathname.search("admin") != -1) {
      setHomeNav(false);
    } else {
      setHomeNav(true);
    }
  }, [location]);
  return (
    <>
      {HomeNav ? <Nav /> : <AdminNav />}
      <Routes>
        {UserRoutes()}
        {AdminRoutes()}
      </Routes>
      <UserFooter />
    </>
  );
}
