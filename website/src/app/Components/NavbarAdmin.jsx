import Link from "next/link";

import { FaHome } from "react-icons/fa";

function Navbar() {
  return (
    <navbar className="">
      <div className="bg-blue-500  text-white text-lg font-semibold h-[70px] flex justify-between ">
        <ul className="py-2 w-[20%] mt-3">
          <Link href="/admin">
            {" "}
            <li className=" ">
              <FaHome className="text-2xl ml-[10px]" />
            </li>
          </Link>
        </ul>
        <ul className="flex w-[60%] justify-between py-2 ">
          <Link href="/admin/schools">
            {" "}
            <li className="mt-[10px] hover:bg-blue-700 py-2 px-2 rounded-md">
              Analyse Structure
            </li>
          </Link>
          <Link href="/admin/updates">
            <li className="mt-[10px] hover:bg-blue-700 py-2 px-2 rounded-md">
              Check Updates
            </li>
          </Link>
          <Link href="/admin/">
            {" "}
            <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md">
              Allocate Resources
            </li>
          </Link>
          <Link href="/principal/Guidelines">
            <li className="mt-[10px]  hover:bg-blue-700 py-2 px-2 rounded-md">
              Check Requests
            </li>
          </Link>
        </ul>
        <ul className="justify-end py-2 w-[20%] mt-2 flex pr-5">
          <Link href="/">
            <li className="">
              {" "}
              <button className=" hover:text-white hover:bg-blue-700 rounded-md p-2  ">
                Signout
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </navbar>
  );
}

export default Navbar;
