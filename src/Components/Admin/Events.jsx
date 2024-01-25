import { Alert, Button, Dropdown, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbReplace } from "react-icons/tb";
import { VscInsert } from "react-icons/vsc";

export default function Events() {
  const [Data, setData] = useState([]);
  const [openViewDocs, setopenViewDocs] = useState([false, { name: "", logo: "", founder: "", link: "", head: "", description: "", content: "", cid: "", approved: null, position: 0 }])
  const [openPopup, setopenPopup] = useState(false)
  const [Warning, setWarning] = useState([false, ""])
  const [Success, setSuccess] = useState([false, ""])

  const load = async () => {
    const send = await fetch("http://localhost:5000/admin/events_approval", {
      method: "GET",
      mode: "cors",
    });
    const { msg } = await send.json();
    setData(msg);
  };

  const accept = async (d) => {
    const send = await fetch("http://localhost:5000/admin/approve_events", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid: d.cid, title: d.title, description: d.description, content: d.content, link: d.link, timeStart: d.timeStart, timeEnd: d.timeEnd })
    });
    const res = await send.json();
    if (res.approved == false) {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    } else {
      setSuccess([true, res.msg])
      setWarning([false, ""])
      load()
    }
  };

  const decline = async (cid, title, description, link, content, timeStart, timeEnd, removed) => {
    const send = await fetch("http://localhost:5000/admin/decline_events", {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid, title, description, link, content, timeStart, timeEnd, removed })
    });
    const res = await send.json();
    if (res.denied) {
      setSuccess([true, res.msg])
      setWarning([false, ""])
      load()
    } else {
      setWarning([true, res.msg])
      setSuccess([false, ""])
    }
  };

  useEffect(() => {
    document.title = " Approve News | Admin"
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
          <h5 className="text-2xl font-bold text-center mb-10">Clubs Requested for News</h5>
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border">

            <Modal className="py-12" show={openViewDocs[0]} onClose={() => setopenViewDocs([false, openViewDocs])}>
              <Modal.Header>
                <div>
                  <h2 className="text-3xl">
                    {openViewDocs[1].name}
                  </h2>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {
                    openViewDocs[0] ?
                      <div>
                        <h5 className="text-sm text-gray-500 font-bold mt-3">Timing</h5>
                        <p className="font-bold text-gray-700"><span className="text-sm text-gray-500 font-bold mr-2 ml-2">Start </span> {openViewDocs[1].timeStart !== "" && openViewDocs[1].timeStart !== undefined ? openViewDocs[1].timeStart.split("T").map(e => e + "  ") : null}</p>
                        <p className="font-bold text-gray-700"><span className="text-sm text-gray-500 font-bold mr-5 ml-2">End</span>{openViewDocs[1].timeEnd !== "" && openViewDocs[1].timeEnd !== undefined ? openViewDocs[1].timeEnd.split("T").map(e => e + "  ") : null}</p>
                        <h5 className="text-sm text-gray-500 font-bold mt-3">Link</h5>
                        <h5 className="text-sm text-gray-800 text-justify">
                          {openViewDocs[1].link !== null && openViewDocs[1].link !== undefined ? openViewDocs[1].link : "No Link"}
                        </h5>
                        <h5 className="text-sm text-gray-500 font-bold mt-3">Content to be shown</h5>
                        <h5 className="text-2xl font-bold text-gray-800 text-justify">
                          {openViewDocs[1].head}
                        </h5>
                        <h5 className="text-base text-gray-800 text-justify mt-2">
                          {openViewDocs[1].description}
                        </h5>
                        <h5 className="text-sm text-gray-500 font-bold mt-3">Proposal</h5>
                        <p className="text-base text-gray-800 text-justify">
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
                      <Button color="red" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); decline(openViewDocs[1].cid, openViewDocs[1].title, openViewDocs[1].description, openViewDocs[1].link, openViewDocs[1].content, openViewDocs[1].timeStart, openViewDocs[1].timeEnd, true) }}>
                        Remove
                      </Button>
                      <Modal show={openPopup} className="py-36" onClose={() => setopenPopup(false)}>
                        <Modal.Header>Choose your option</Modal.Header>
                        <Modal.Body>
                          <h5 className="mx-1 mb-5">A News is present already over there so you can choose any one of these option</h5>
                          <div className="flex">
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To insert the News in between the position use replace option if any old carosel at that position it will move one step back.
                            </Alert>
                            <Alert color="warning" icon={HiInformationCircle} className="mx-1 w-full">
                              To replace with old News use replace option and position of old News will be out.
                            </Alert>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                    :
                    <div className="flex">
                      <Button className="bg-black mr-2" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); accept(openViewDocs[1]) }}>Approve</Button>
                      <Button color="red" onClick={() => { setopenViewDocs([false, openViewDocs[1]]); decline(openViewDocs[1].cid, openViewDocs[1].title, openViewDocs[1].description, openViewDocs[1].link, openViewDocs[1].content, openViewDocs[1].timeStart, openViewDocs[1].timeEnd, false) }}>
                        Decline
                      </Button>
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
                      Timings
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Link
                    </th>
                    <th className="px-6 py-3 text-center border font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    Data.length > 0 ? Data.map((e, i) => {

                      return (
                        <tr key={i} className="cursor-pointer" onClick={ele => { setopenViewDocs([true, e]) }}>
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.cid}
                          </td>
                          <td className="px-6 text-center border py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                            {e.name}
                          </td>
                          <td className="px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                            <p className="font-bold text-gray-700"><span className="text-sm text-gray-500 font-bold mr-2 ml-2">Start<br /></span> {e.timeStart !== "" && e.timeStart !== undefined ? e.timeStart.split("T").map(e => e + "  ") : null}</p>
                            <p className="font-bold text-gray-700"><span className="text-sm text-gray-500 font-bold mr-5 ml-2">End<br /></span>{e.timeEnd !== "" && e.timeEnd !== undefined ? e.timeEnd.split("T").map(e => e + "  ") : null}</p>
                          </td>
                          <td className="px-6 text-center py-4 border whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                            {e.link !== null && e.link !== "" ? e.link : "No link"}
                          </td>
                          <td className="px-6 text-center py-4 border text-sm leading-5 text-indigo-600">
                            <h5>{e.approved ? `Approved` : "Not Approved"}  </h5>
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
