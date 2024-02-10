import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import HomeGraph from './Home/HomeGraph';

export default function ClubHome() {
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["CAAUAT"]);
  
  const check = async () => {
    const getUser = await fetch("http://192.168.1.35:5000/myclub/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.CAAUAT }),
    });
    const { msg } = await getUser.json();
    console.log(msg);
    if (msg != "Access granted") {
      if(msg == "Account deleted"){
        setCookie(["CAAUAT",null])
      }
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
