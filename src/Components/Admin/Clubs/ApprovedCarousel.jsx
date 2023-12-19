import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

export default function ApprovedCarousel() {
  const [Data, setData] = useState([])

  const getData = async () => {
    const req = await fetch('http://localhost:5000/admin/approved_carousels', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
    const res = await req.json()
    console.log(res);
    setData(res)
  }
  const remove=async()=>{
    
  }
  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      <h2 className='text-center mt-10 text-lg font-bold'>Approved Carousels</h2>
      <div className='flex items-center mt-10 flex-col'>
        {
          Data.map((e, i) => {
            let data = { founder: "", name: "" }
            return (
              <div className=''>
                <img key={i} width={"90%"} src={`http://localhost:5000/myclub/carousel/${e.img}`} alt="" />
                    <h2 className='text-sm mt-2'>Club Id</h2>
                    <h2 className='text-sm mb-2'>{e.cid}</h2>
                    <div className='flex'>
                    <Button color="warning">Reomve</Button>
                    <Button className='mx-2' color="dark">Change</Button>
                    </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
