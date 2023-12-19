import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Clubs() {
  document.title = "All Clubs | Placement App";
  const [clubs, setClubs] = useState([])
  const AllData = async () => {
    const send = await fetch("http://https://psa-server-placement-system-application.vercel.app/admin/clubs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const { msg } = await send.json();
      
    if(msg.length>0){
      setClubs(msg);
    }
  };
  useEffect(() => {
    AllData();
  }, []);

  return (
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
              Edit
            </th>
            <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {
            clubs.length >0 ?clubs.map((e,i)=>{
              return (
          <tr key={i}> 
            <td
              width={300}
              className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
            >
              <img className="rounded" src={`http://https://psa-server-placement-system-application.vercel.app/admin/clublogo/${e.logo}`} height={"100px"} width={150} />
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
              <a href="/tables">Edit</a>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
              <a href="/tables">Delete</a>
            </td>
          </tr>
              )
            })
          :<tr><td>No CLubs</td></tr>}
          
        </tbody>
      </table>
      <Link className="text-white bg-black px-3 p-1" to="/admin/addclub">
        Add New Club
      </Link>
    </div>
  );
}
