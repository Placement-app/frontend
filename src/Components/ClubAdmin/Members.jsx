import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react'
export default function Members() {
  const [Cid, setCid] = useState("")
  const [Data, setData] = useState([])
  const navigate = useNavigate()
  const [cookie, setCookie] = useCookies(["CAAUAT"]);
  const [sideView, setsideView] = useState({ name: "", email: "", regno: "" })
  const [Notifi, setNotifi] = useState({ msg: "", open: false, color: "success" })
  const all = async () => {
    const send = await fetch("https://psa-server.vercel.app/myclub/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        cid: Cid
      }),
    });
    const { data } = await send.json()
    setData(data)
    ChangeSideView(data[0].userId)
  }

  const ChangeSideView = async (userId) => {
    const send = await fetch("https://psa-server.vercel.app/myclub/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        userId
      }),
    });
    const { data } = await send.json()
    setsideView(data)
  }

  const check = async () => {
    const getUser = await fetch("https://psa-server.vercel.app/myclub/protected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ token: cookie.CAAUAT }),
    });

    const { msg, cid } = await getUser.json();
    if (msg == "Access granted") {
      setCid(cid)
    } else {
      navigate('/myclub/login')
    }
  };

  const add = async (userId) => {
    const send = await fetch("https://psa-server.vercel.app/myclub/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        userId, cid: Cid
      }),
    });
    const res = await send.json()
    setNotifi({ color: !!res.updated ? "success" : "warning", open: true, msg: res.msg })
    all()
  }

  useEffect(() => {
    check()
    all()
    console.log(Notifi);
  }, [Cid])

  return (
    <div className='pt-16 flex'>
      <div className='fixed w-full flex justify-center'>
        <Alert style={{ display: Notifi.open ? null : "none" }} className='w-1/2' color={Notifi.color}>
          <h2>{Notifi.msg}</h2>
        </Alert>
      </div>
      <div className="w-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            {
              Data ? Data.map((e, i) => {
                return (
                  <tr key={i} className="cursor-pointer" onClick={ele => { ChangeSideView(e.userId) }}>
                    <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {e.userId}
                    </td>
                    <td className="px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                      {e.status}
                    </td>
                  </tr>
                )

              })

                : <tr></tr>}
          </tbody>
        </table>
      </div>
      <div className=' w-full max-w-1/2 mx-6 shadow-md rounded border p-4'>
        <p className='text-gray-500 text-xs'>User Name</p>
        <p>{sideView.name}</p>
        <p className='mt-2 text-gray-500 text-xs'>Email</p>
        <p>{sideView.email}</p>
        <p className='mt-2 text-gray-500 text-xs'>Register Number</p>
        <p>{sideView.regno}</p>
        <p className='mt-2 text-gray-500 text-xs'>Roll</p>
        <p>Web Developer</p>
        {
          sideView.status == "Requested" ?
            <div>
              <button className='bg-black text-white rounded px-4 py-1 mt-4' onClick={e => add(sideView._id)}>Add</button>
              <button className='bg-red-600 text-white rounded px-4 py-1 mt-4 ml-2'>Remove</button>
            </div>
            : <div>
              <button className='bg-red-600 text-white rounded px-4 py-1 mt-4'>Remove</button>
              <button className='bg-yellow-400 text-white rounded px-4 py-1 mt-4  ml-2' onClick={e => add(sideView._id)}>Block</button>
            </div>
        }


      </div>

    </div>
  )
}
