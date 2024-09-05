'use client'

import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch }) => {
  const [udiseCode, setUdiseCode] = useState("");

  const handleSearch = () => {
   
    const schoolData = getSchoolByUdise(udiseCode); 

    if (schoolData) {
      onSearch(schoolData); 
    } else {
      alert("School not found!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 ml-[1000px]">
      <input
        type="text"
        value={udiseCode}
        onChange={(e) => setUdiseCode(e.target.value)}
        placeholder="Enter UDISE Code"
        className="w-[300px] p-2 border border-gray-300 rounded-md absolute"
      />
      <button
        onClick={handleSearch}
        className="mt-[8px] w-[50px] ml-[300px]  p-2 rounded-md"
      >
        <CiSearch />
      </button>
    </div>
  );
};


function getSchoolByUdise(udiseCode) {
  const schools = [
    { udiseCode: "123456", name: "Green Valley School", structure: "Standard", resources: "Adequate" },
    { udiseCode: "654321", name: "Blue Ridge School", structure: "Odd", resources: "Limited" },
  ];

  return schools.find((school) => school.udiseCode === udiseCode);
}

export default SearchBar;
