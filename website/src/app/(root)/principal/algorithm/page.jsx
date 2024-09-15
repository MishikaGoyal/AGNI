"use client";
import React, { useState } from 'react';
import axios from 'axios';

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

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/algorithm', inputData);
            setResult(response.data);
            console.log(response.data); // Log response data directly
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-4">
            <h1 className="text-2xl font-bold mb-4">Grant Calculation Page</h1>
            <button onClick={handleSubmit} className='btn btn-outline mt-4'>Calculate Output</button>
            {result && <pre className="mt-4">{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default Page;