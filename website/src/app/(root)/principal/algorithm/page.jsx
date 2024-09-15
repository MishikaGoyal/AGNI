"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from '@/app/Components/Navbar1';

const inputBody = {

    "UDISE CODE": "08  12  26  05  903",
    "School Name": "MERRYLAND SCHOOL PS",
    "State": "Rajasthan",
    "School Category": "1",
    "School Management": "3",
    "School Type": "5",
    "Grade Configuration": "(1,5)",
    "Year of Establishment": "1972",
    "Boundary Wall": "1",
    "Total Class Rooms": "9",
    "Library Available": "1",
    "Separate Room for HM": "1",
    "Drinking Water Available": "1",
    "Playground Available": "1",
    "Electricity Availability": "1",
    "Total Teachers": "4",
    "Total Washrooms": "(1,2)",
    "Total Students": "243",
    "Result": "ODD"
};

function Page() {
    const [inputData, setInputData] = useState(inputBody);
    const [result, setResult] = useState(null);

    const handleAlgorithm = async () => {
        try {
            const response = await axios.post('/api/algorithm', inputData);
            setResult(response.data);
            console.log(response.data); // Log response data directly
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const sendMessage = async (apiEndpoint) => {
        const phoneNumber = "+918651599266";
    
        try {
          const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: phoneNumber }),
          });
    
          const data = await response.json();
          if (data.success) {
            alert("Message sent successfully!");
          } else {
            alert("Failed to send message: " + data.error);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Error sending message");
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

                    {/* button for message */}
                    <button className='btn btn-outline' onClick={()=>  sendMessage("/api/sendmessage2")}>Make Request</button>
                </div>

                {result && <pre className="mt-4">{JSON.stringify(result, null, 2)}</pre>}
            </div>
        </div>
    );
}

export default Page;