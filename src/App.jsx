import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "flowbite/dist/flowbite.css";
import "./App.css";

import Nav from "./Components/Users/Nav";
import AdminNav from "./Components/Admin/AdminNav";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import UserFooter from "./Components/Users/UserFooter";
import ClubAdminNav from "./Components/ClubAdmin/ClubAdminNav";
import ClubRoutes from "./Routes/ClubRoutes";

export default function App() {
  const [Navi, setNavi] = useState(true);

  useEffect(() => {
    if (location.pathname.search("myclub") != -1) {
      setNavi("club")
    }
    else if (location.pathname.search("admin") != -1) {
      setNavi("admin");
    }
    else {
      setNavi("home");
    }
  }, [location]);
  return (
    <>
      {Navi == "home" ? <Nav /> : Navi == "club" ? <ClubAdminNav /> : <AdminNav />}
      <Routes>
        {UserRoutes()}
        {ClubRoutes()}
        {AdminRoutes()}
      </Routes>
      {Navi == "home" ? <UserFooter /> : null}
    </>
  );
}
