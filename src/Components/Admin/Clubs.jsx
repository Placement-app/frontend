import { Table } from 'flowbite-react';
import iclub from '../../assets/img/ieee-la-gi-removebg-preview.png'
export default function Clubs() {
    document.title = "All Clubs | Placement App"
  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-black text-white text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Club Logo
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
          <tr>
            <td width={300} className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
              <img src={iclub} height={'100px'} width={150}/>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              IEEE CISSC
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              ....
            </td>
            
            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
              <a href="/tables">Edit</a>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-600 hover:text-indigo-900">
              <a href="/tables">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      <button className='text-white bg-black px-3 p-1 '>Add New Club</button>
    </div>
  
  )
}


