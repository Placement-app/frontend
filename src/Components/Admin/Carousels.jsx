import { Alert, Button, Dropdown, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { HiInformationCircle } from "react-icons/hi";
import { TbReplace } from "react-icons/tb";
import { VscInsert } from "react-icons/vsc";

export default function Carousel() {
  const [Data, setData] = useState([]);
  const [openViewDocs, setopenViewDocs] = useState([false, { name: "", logo: "", founder: "", img: "", content: "", cid: "", approved: null, position: 0 }])
  const [openPopup, setopenPopup] = useState(false)
  const [Warning, setWarning] = useState([false, ""])
  const [Success, setSuccess] = useState([false, ""])
  const [opt, setopt] = useState(0)
  const load = async () => {
    const send = await fetch("http://192.168.1.35:5000/admin/carousel_approval", {
      method: "GET",
      mode: "cors",
    });
    const { msg } = await send.json();
    setData(msg);
  };

  const accept = async (d) => {
    const send = await fetch("http://192.168.1.35:5000/admin/approve_carousel", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid: d.cid, img: d.img, content: d.content, position: opt })
    });
    const res = await send.json();
    console.log(res);
    if (res.approved == false) {
      if (res.change) {
        setopenPopup(true)
      } else {
        setWarning([true, res.msg])
        setSuccess([false, ""])
      }
    } else {
      setSuccess([true, res.msg])
      setWarning([false, ""])
      setopenViewDocs([false, openViewDocs[1]]);
      load()
    }
  };
  const decline = async (cid, remove) => {
    const send = await fetch("http://192.168.1.35:5000/admin/decline_carousel", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid, remove })
    });
    const res = await send.json();
    if (res.updated) {
      setSuccess([true, res.msg])
      setWarning([false, ""])
      load()
    } else {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    }
  };

  const change = async (option, proceed) => {
    try {
      const req = await fetch('http://192.168.1.35:5000/admin/change_carousel', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({ cid: openViewDocs[1].cid, position: opt, option, proceed })

      })
      const res = await req.json()
      if (res.msg === "already found") {
        setopenPopup(true)
      } else {
        setopenPopup(false)
        setopenViewDocs([false, openViewDocs[1]])
        if (res.updated) {
          setSuccess([true, res.msg])
          setWarning([false, ""])
          load()

        } else {
          setWarning([true, res.msg])
          setSuccess([false, ""])
        }
      }

    } catch (error) {
      setWarning([true, "Something went wrong try again!"])
      setSuccess([false, ""])
    }
  }
  useEffect(() => {
    document.title = " Approve Carousels | Admin"
    load();
  }, []);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5" style={{ paddingTop: 20 }}>
        <div className="pt-12 pb-4 flex w-full justify-center">
          {Warning[0] ? <Alert color="failure" icon={HiInformationCircle} className="mx-4">
            <span>
              <p>
                <span className="font-medium">{Warning[1]}</span>
              </p>
            </span>
          </Alert> : ""}
          {Success[0] ? <Alert color="success" icon={CiCircleCheck} className="mx-4 w-64">
            <span>
              <p>
                <span className="font-medium">{Success[1]}</span>
              </p>
            </span>
          </Alert> : ""}
        </div>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <h5 className="text-2xl font-bold text-center mb-10">Clubs Requested for carousel</h5>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border">

            <Modal className="mt-7" show={openViewDocs[0]} onClose={() => setopenViewDocs([false, openViewDocs])}>
              <Modal.Header>
                <div>
                  <h2 className="text-3xl">
                    {openViewDocs[1].name}
                  </h2>
                  <p className="text-base leading-relaxed text-gray-700 text-right">
                    by {openViewDocs[1].founder}
                  </p>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {
                    openViewDocs[0] ? <div>
                      {
                        openViewDocs[0] ? <img src={`http://192.168.1.35:5000/myclub/carousel/${openViewDocs[1].img}`} width={"100%"} alt="" /> : ""
                      }
                      <p className="text-base leading-relaxed text-gray-800 text-justify mt-10">
                        {openViewDocs[1].content}
                      </p>

                    </div> : ""
                  }
                </div>
              </Modal.Body>
              <Modal.Footer>
                {
                  openViewDocs[1].approved == true ?
                    <div className="flex">
                      <select name="Position" className="rounded-md bg-black text-white mr-2" onChange={e => {
                        setopt(e.target.value);
                        setopenViewDocs([true, { ...openViewDocs[1], position: e.target.value }]);
                        change(0, false, e.target.value)
                      }} value={openViewDocs[1].position}>
                        <option className="text-white" value="0">Out</option>
                        <option className="text-white" value="1">1</option>
                        <option className="text-white" value="2">2</option>
                        <option className="text-white" value="3">3</option>
                        <option className="text-white" value="4">4</option>
                        <option className="text-white" value="5">5</option>
                      </select>
                      <Button color="red" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); decline(openViewDocs[1].cid,true) }}>
                        Remove
                      </Button>
                      <Modal show={openPopup} className="py-36" onClose={() => setopenPopup(false)}>
                        <Modal.Header>Choose your option</Modal.Header>
                        <Modal.Body>
                          <h5 className="mx-1 mb-5">A carousel is present already over there so you can choose any one of these option</h5>
                          <div className="flex">
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To insert the carousel in between the position use replace option if any old carosel at that position it will move one step back.
                            </Alert>
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To replace with old carousel use replace option and position of old carousel will be out.
                            </Alert>
                          </div>
                          <div className="mt-4 mx-1 flex">
                            <button onClick={e => { change(1, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><VscInsert className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Insert</button>
                            <button onClick={e => { change(0, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><TbReplace className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Replace</button>
                          </div>

                        </Modal.Body>
                      </Modal>
                    </div>
                    :
                    <div className="flex">
                      <Button className="bg-black mr-2" onClick={() => { accept(openViewDocs[1]) }}>Approve</Button>
                      <select name="Position" className="rounded-md bg-black text-white mr-2" onChange={e => setopt(e.target.value)} value={opt}>
                        <option className="text-white" value="0">Out</option>
                        <option className="text-white" value="1">1</option>
                        <option className="text-white" value="2">2</option>
                        <option className="text-white" value="3">3</option>
                        <option className="text-white" value="4">4</option>
                        <option className="text-white" value="5">5</option>
                      </select>
                      <Button color="red" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); decline(openViewDocs[1].cid,false) }}>
                        Decline
                      </Button>
                      <Modal show={openPopup} className="py-36" onClose={() => setopenPopup(false)}>
                        <Modal.Header>Choose your option</Modal.Header>
                        <Modal.Body>
                          <h5 className="mx-1 mb-5">A carousel is present already over there so you can choose any one of these option</h5>
                          <div className="flex">
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To insert the carousel in between the position use replace option if any old carosel at that position it will move one step back.
                            </Alert>
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To replace with old carousel use replace option and position of old carousel will be out.
                            </Alert>
                          </div>
                          <div className="mt-4 mx-1 flex">
                            <button onClick={e => { change(1, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><VscInsert className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Insert</button>
                            <button onClick={e => { change(0, true) }} className="text-white bg-black rounded px-3 py-1 mx-1 cursor-pointer flex justify-center items-center text-sm"><TbReplace className="mr-2" color="white" style={{ height: 20, width: 20 }} /> Replace</button>
                          </div>

                        </Modal.Body>
                      </Modal>
                    </div>

                }

              </Modal.Footer>
            </Modal>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Club ID
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Club Name
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Docs
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Status & Position
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    Data.length > 0 ? Data.map((e, i) => {

                      return (
                        <tr key={i} onClick={ele => { setopenViewDocs([true, e]) }} className="cursor-pointer">
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.cid}
                          </td>
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.name}
                          </td>
                          <td className="px-6 cursor-pointer text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                            View Docs
                          </td>
                          <td className="px-6 text-center py-4 border text-sm leading-5 text-indigo-600">
                            {e.approved ? `Approved | ${e.position == 0 ? "Removed" : e.position}` : "Not Approved"}
                          </td>
                        </tr>
                      )

                    })

                      : <tr></tr>}
                </tbody>
              </table>
              {Data.length === 0 ? <h5 className="w-full text-center p-10 text-gray-600 ">No records found</h5> : null}
            </div>
          </div>
        </div>
      </section>
    </>

  );
}
