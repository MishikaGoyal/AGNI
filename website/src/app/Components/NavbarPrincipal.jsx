import Link from "next/link";

import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
<<<<<<< HEAD
    <navbar className="">
      <div className="bg-blue-500  font-semibold text-lg text-white h-[70px]  ">
        <ul className="flex space-x-6 px-3 h-full first-letter:h-full justify-between ">
          <div className="w-[20%] mt-3 ">
            <Link href="/principal">
              {" "}
              <li className=" py-2  ">
                <FaHome className="text-2xl ml-[10px]" />
              </li>
            </Link>
          </div>
          <div className="flex w-[60%] border-2 border-blue-500 px-3  justify-between">
            <Link href="/principal/structure">
              {" "}
              <li className="mt-[10px] hover:bg-blue-700 py-2 px-2 rounded-md ">
                Know Structure
              </li>
            </Link>
            <Link href="/principal/Progress">
              <li className="mt-[10px] hover:bg-blue-700 py-2 px-2 rounded-md ">
                Make Updates
              </li>
            </Link>
            <Link href="/principal/algorithm">
              {" "}
              <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md ">
                Check Resources
              </li>
            </Link>
            <Link href="/principal/Guidelines">
              <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md ">
                Guidelines
              </li>
            </Link>
          </div>
          <div className="w-[20%] flex justify-end pr-5 py-2">
            <Link href="/">
              <li className="">
                {" "}
                <button className=" hover:text-white hover:bg-blue-700 py-2 px-2 rounded-md ">
                  Signout
                </button>
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </navbar>
  );
=======
    <navbar className=" text-white shadow-lg">
    <div className="flex items-center bg-gray-800 justify-between h-[60px] px-4">
      
      {/* Home Icon */}
      <ul className="flex items-center">
        <Link href="/principal">
          <li className="hover:text-blue-400">
            <FaHome className="text-2xl" />
          </li>
        </Link>
      </ul>
  
      {/* Center Links */}
      <ul className="flex space-x-8">
        <Link href="/principal/structure">
          <li className="hover:text-blue-400">Know Structure</li>
        </Link>
        <Link href="/principal/Progress">
          <li className="hover:text-blue-400">Make Updates</li>
        </Link>
        <Link href="/principal/algorithm">
          <li className="hover:text-blue-400">Check Resources</li>
        </Link>
        <Link href="/principal/Guidelines">
          <li className="hover:text-blue-400">Guidelines</li>
        </Link>
      </ul>
  
      {/* Signout Button */}
      <ul className="flex items-center">
        <Link href="/">
          <li>
            <button className="bg-white text-gray-800 hover:bg-gray-700 hover:text-white p-2 rounded-md transition duration-300">
              Sign out
            </button>
          </li>
        </Link>
      </ul>
  
    </div>
  </navbar>
  
  )
>>>>>>> 785748c5 (organised output of algo)
}

export default Navbar;
