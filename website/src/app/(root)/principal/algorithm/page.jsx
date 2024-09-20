"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from '@/app/Components/NavbarPrincipal';

function Page() {
  const [inputData, setInputData] = useState(null); // For storing fetched school data
  const [result, setResult] = useState(null);
  const [udiseId, setUdiseId] = useState(null);

  // Get the UDISE ID from session storage on component mount
  useEffect(() => {
    const id = sessionStorage.getItem("udiseId");
    if (id) {
      console.log("Fetched UDISE ID:", id); // Log UDISE ID
      setUdiseId(id);
    } else {
      console.error("No UDISE ID found in session storage.");
    }
  }, []);


  // Function to fetch new data based on the UDISE ID
  const getNewData = async () => {
    if (!udiseId) {
      console.error("No UDISE ID found.");
      return;
    }

    try {
      console.log("Sending request with UDISE ID:", udiseId); // Log request body
      const response = await fetch("/api/school-data", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ udiseId: udiseId }), // Ensure this is correct
      });

      if (!response.ok) {
        console.error("Error in fetching school data:", response.statusText);
      } else {
        const data = await response.json();
        setInputData(data);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };


  // Function to handle algorithm calculation
  const handleAlgorithm = async () => {
    if (!inputData || !inputData.data) {
      console.error("No data available to pass to the algorithm.");
      return;
    }

    try {
      const response = await axios.post('/api/algorithm', inputData.data); // Pass only the `data` part of the fetched data
      setResult(response.data);
      console.log(response.data); // Log response data directly
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <Navbar1 text={"PRINCIPAL"} />

      <div className="flex flex-col items-center mt-4">
        <h1 className="text-2xl font-bold mb-4">Grant Calculation Page</h1>

        {/* Align buttons in a row with some space between them */}
        <div className="flex space-x-4 mt-4">
          {/* button for algorithm */}
          <button onClick={handleAlgorithm} className='btn btn-outline'>Calculate Output</button>

          {/* button for fetching new data */}
          <button className='btn btn-outline' onClick={getNewData}>Fetch School Data</button>
        </div>

        {/* Display fetched data as JSON */}
        {inputData && <pre className="mt-4">{JSON.stringify(inputData, null, 2)}</pre>}

        {/* Display result from the algorithm */}
        {result && <pre className="mt-4">{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default Page;
