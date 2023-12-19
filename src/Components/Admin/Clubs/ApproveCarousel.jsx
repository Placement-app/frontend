import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ApproveCarousel() {
  const [Data, setData] = useState([]);
  const [openViewDocs, setopenViewDocs] = useState([false, { name: "", logo: "", founder: "", carousel: { img: "", content: "", cid: "" } }])
  const [Warning, setWarning] = useState([false,""])
  const load = async () => {
    const send = await fetch("http://localhost:5000/admin/carousel_approval", {
      method: "GET",
      mode: "cors",
    });
    const { msg } = await send.json();
    setData(msg.carousel);
  };
  const accept = async (d) => {
    const send = await fetch("http://localhost:5000/admin/approve_carousel", {
      method: "POST",
      mode: "cors",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({cid:d.cid,img:d.data.img,content:d.data.content})
    });
    const res = await send.json();
    if(res.approved==false){
      setWarning([false,res.msg])
    }else{
        
    }
  };
  const decline = async () => {
    const send = await fetch("http://localhost:5000/admin/clubs_approval", {
      method: "GET",
      mode: "cors",
    });
    const { msg } = await send.json();
    console.log(msg);
    setData(msg);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <Modal show={openViewDocs[0]} onClose={() => setopenViewDocs([false, openViewDocs])}>
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
                  openViewDocs[0] ? <img src={`http://localhost:5000/myclub/carousel/${openViewDocs[1].data.img}`} width={"100%"} alt="" /> : ""
                }

                <p className="text-base leading-relaxed text-gray-800 text-justify mt-10">
                  {openViewDocs[1].data.content}
                </p>

              </div> : ""
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-black" onClick={() => {setopenViewDocs([false, openViewDocs[1]]);accept(openViewDocs[1])}}>Approve</Button>
          <Button color="gray" onClick={() => setopenViewDocs([false, openViewDocs[1]])}>
            Decline
          </Button>

        </Modal.Footer>
      </Modal>
      <div className="p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Club Logo
              </th>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Club ID
              </th>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Club Name
              </th>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Leader
              </th>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                View Proposal
              </th>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              Data.length > 0 ? Data.map((e, i) => {

                return (
                  <tr key={i}>
                    <td
                      width={300}
                      className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                    >
                      <img className="rounded" src={`http://localhost:5000/admin/clublogo/${e.logo}`} height={"100px"} width={150} />
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {e.cid}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {e.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {e.founder}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
                      <button onClick={ele => {setopenViewDocs([true, e])}}>View Docs</button>

                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-indigo-600">
                      <a href="/tables">{e.approved ? "Approved" : "Not Approved"}</a>
                    </td>
                  </tr>
                )

              })

                : <tr><td>No CLubs</td></tr>}

          </tbody>
        </table>
      </div>
    </div>
  );
}
