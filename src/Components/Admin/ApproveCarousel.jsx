import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ApproveCarousel() {
  const [Data, setData] = useState([]);
  const load = async () => {
    const send = await fetch("http://localhost:5000/admin/carousel_approval", {
      method: "GET",
      mode: "cors",
    });
    const { msg } = await send.json();
    setData(msg[0].carousel);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div>
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
                Status
              </th>
              <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Approve/decline
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {
            Data.length >0 ?Data.map((e,i)=>{
                console.log(e.logo);
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
              <a href="/tables">{e.approved?"Approved":"Not Approved"}</a>
            </td>
            <td className="px-6 py-4 text-sm leading-5 text-indigo-600">
              <button className="bg-black text-white rounded p-1 m-1">OK</button>
              <button className="bg-black text-white rounded p-1 m-1">NO</button>
            </td>
          </tr>
              )
            })
          :<tr><td>No CLubs</td></tr>}
          
        </tbody>
        </table>
      </div>
    </div>
  );
}
