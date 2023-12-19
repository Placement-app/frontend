import React from 'react'
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { TbCarouselHorizontalFilled } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';



export default function AdminHome() {
  document.title = "Dashboard | Placement App Admin";
  const navigate = useNavigate()
  return (
    <>
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Club Analytics
          </Sidebar.Item>
          <Sidebar.Collapse icon={TbCarouselHorizontalFilled} label="Carousel">
            <Sidebar.Item ><div onClick={e=>navigate("/admin/allcarousel")}>All Clubs Carousel</div></Sidebar.Item>
            <Sidebar.Item href="#"><div onClick={e=>navigate("/admin/approvedcarousel")}>Approved Carousel</div></Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </>

  )
}
