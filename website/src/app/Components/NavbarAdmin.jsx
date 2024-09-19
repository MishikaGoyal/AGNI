'use client'
import React,{useState} from 'react'
import SearchBar from './Searchbar'

function Navbar() {
  const [selectedSchool, setSelectedSchool] = useState(null); 

  const handleSearch = (schoolData) => {
    setSelectedSchool(schoolData); 
  };

  return (
    <navbar  className='w-[100vh]'>
    <div className='bg-gray-900 text-white h-[60px]'>
      <ul className=''>
        <li className='-ml-[100px] absolute'><SearchBar onSearch={handleSearch} />


{selectedSchool && (
  <div className="mt-[300px] ml-[200px] text-black">
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
  
)}</li>
        <li><button className='ml-[1300px] mt-[10px] text-white hover:text-black hover:bg-white  p-2 '>Signout</button></li>
      </ul>
    </div>
  </navbar>
  )
}

export default Navbar