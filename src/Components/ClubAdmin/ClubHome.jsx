import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import HomeGraph from './Home/HomeGraph';

export default function ClubHome() {
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["CAAUAT"]);
  const check = async () => {
    const getUser = await fetch("https://psa-server.vercel.app/user/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.CAAUAT }),
    });
    const { msg } = await getUser.json();
    if (msg != "Access granted") {
      navigate('/myclub/login')
    }
  }
  useEffect(() => {
    check()
  }, [])


  return (
    <div className='pt-20'>

      <HomeGraph />
    </div>
  )
}
