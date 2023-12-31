import { Alert, Button, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
export default function ApprovedCarousel() {
  const [Data, setData] = useState([{ img: "", cid: "" }])
  const [Warning, setWarning] = useState([false, ""])
  const [Success, setSuccess] = useState([false, ""])
  const getData = async () => {
    const req = await fetch('https://psa-server.vercel.app/admin/approved_carousels', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
    const res = await req.json()
    setData(res)
  }
  const remove = async (cid) => {
    const req = await fetch('https://psa-server.vercel.app/admin/remove_carousel', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({ cid })
    })
    const res = await req.json()
    if (res.removed) {
      setSuccess([true, res.msg])
      setWarning([false, ""])
      getData()

    } else {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    }
  }
  useEffect(() => {
    document.title = "Approved Carousel | Admin"
    getData()

  }, [])


  return (
    <div>
      <h2 className='text-center text-lg font-bold  mt-10'>Approved Carousels</h2>
      <div className='mx-10 mt-3' style={{ display: Warning[0] ? null : "none" }}>
        <Alert
          color="failure"
          icon={HiInformationCircle}
        >
          <span>
            <p>
              <span className="font-medium">{Warning[1]}</span>
            </p>
          </span>
        </Alert>
      </div>
      <div className='mt-3' style={{ display: Success[0] ? null : "none" }}>
        <Alert
          color="success"
          icon={HiInformationCircle}
        >
          <span>
            <p>
              <span className="font-medium">{Success[1]}</span>
            </p>
          </span>
        </Alert>
      </div>

      <div className='flex justify-center items-center md:mx-5 '>
        {
          Data.length > 0 ? <div className='mt-10 grid md:grid-cols-3'>
            {
              Data.map((e, i) => {
                return (
                  <div >
                    <Card
                      key={i}
                      className="max-w-sm mx-2 mt-2"
                      imgAlt="Meaningful alt text for an image that is not purely decorative"
                      imgSrc={`https://psa-server.vercel.app/myclub/carousel/${e.img}`}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {e.cid}
                      </p>
                      <div className='flex'>
                        <Button color="warning" onClick={ele => remove(e.cid)}>Reomve</Button>
                        <Button className='mx-2' color="dark">Change</Button>
                      </div>
                    </Card>
                  </div>
                )
              })
            }
          </div> : <h2 className='text-center'>No Datas found</h2>
        }
      </div>
    </div>
  )
}
