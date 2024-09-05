'use client'

import { useState } from "react";
import SearchBar from "@/app/Components/Searchbar";
import { IoSchoolSharp } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { MdAnnouncement } from "react-icons/md";
import Link from "next/link";

export default function Page() {
  const [selectedSchool, setSelectedSchool] = useState(null); 

  const handleSearch = (schoolData) => {
    setSelectedSchool(schoolData); 
  };

  return (
  <div>
    <div>
    <ul className="menu bg-base-200 rounded-box w-56 absolute mt-[50px] h-[90%]  gap-9 justify-center text-center">
  <li className='mt-[30px]'>
    <Link href='/Schools'>
      <IoSchoolSharp />
      Schools
    </Link>
  </li>
  <li>
    <a>
     <GrResources />Resources
    </a>
  </li>
  <li className='ml-[3px]'>
    <a>
    <MdAnnouncement />Announcements
    </a>
  </li>
</ul>
    </div>
    <div>
  
      <SearchBar onSearch={handleSearch} />


      {selectedSchool && (
        <div className="mt-[300px] ml-[200px]">
          <input type="checkbox" id="my_modal_6" className="modal-toggle" defaultChecked />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">{selectedSchool.name}</h3>
              <p className="py-4">Structure: {selectedSchool.structure}</p>
              <p className="py-2">Resources: {selectedSchool.resources}</p>
              <div className="modal-action">
                <label
                  htmlFor="my_modal_6"
                  className="btn"
                  onClick={() => setSelectedSchool(null)} 
                >
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

