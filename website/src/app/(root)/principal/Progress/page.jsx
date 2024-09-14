"use client";

import { useState, useEffect } from "react";

export default function UpdateSchool() {
  const sendUpdate = async () => {
    const response = await fetch("/api/update", {
      headers: { "Content-type": "application/json" },
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  useEffect(() => {
    const code = sessionStorage.getItem("udiseId");
    if (code) {
      setFormData((prevData) => ({
        ...prevData,
        UDISE_CODE: code,
      }));
    }
  }, []);

  const [formData, setFormData] = useState({
    UDISE_CODE: "",
    State: "",
    Grade_Configuration: "",
    Boundary_Wall: false,
    Total_Class_Rooms: "",
    Library_Available: false,
    Separate_Room_for_HM: false,
    Drinking_Water_Available: false,
    Playground_Available: false,
    Electricity_Availability: false,
    Total_Teachers: "",
    Total_Washrooms: "",
    Total_Students: "",
    Result: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update School Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="border-t border-gray-200 pt-4">
          <legend className="text-lg font-semibold">School Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="font-medium mb-1">State:</span>
              <input
                type="text"
                name="State"
                value="Karnataka"
                className="p-2 border border-gray-300 rounded"
                disabled
              />
            </label>
            <label className="flex flex-col">
              <span className="font-medium mb-1">Grade Configuration:</span>
              <input
                type="text"
                name="Grade_Configuration"
                value={formData.Grade_Configuration}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
          </div>
        </fieldset>
        <fieldset className="border-t border-gray-200 pt-4">
          <legend className="text-lg font-semibold">Facilities</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Boundary_Wall"
                checked={formData.Boundary_Wall}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Boundary Wall</span>
            </label>
            <label className="flex flex-col">
              <span className="font-medium mb-1">Total Class Rooms:</span>
              <input
                type="text"
                name="Total_Class_Rooms"
                value={formData.Total_Class_Rooms}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Library_Available"
                checked={formData.Library_Available}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Library Available</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Separate_Room_for_HM"
                checked={formData.Separate_Room_for_HM}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Separate Room for HM</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Drinking_Water_Available"
                checked={formData.Drinking_Water_Available}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Drinking Water Available</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Playground_Available"
                checked={formData.Playground_Available}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Playground Available</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="Electricity_Availability"
                checked={formData.Electricity_Availability}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Electricity Availability</span>
            </label>
            <label className="flex flex-col">
              <span className="font-medium mb-1">Total Teachers:</span>
              <input
                type="text"
                name="Total_Teachers"
                value={formData.Total_Teachers}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="font-medium mb-1">Total Washrooms:</span>
              <input
                type="text"
                name="Total_Washrooms"
                value={formData.Total_Washrooms}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="border-t border-gray-200 pt-4">
          <legend className="text-lg font-semibold">
            Student and Result Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="font-medium mb-1">Total Students:</span>
              <input
                type="text"
                name="Total_Students"
                value={formData.Total_Students}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="font-medium mb-1">Status:</span>
              <input
                type="text"
                name="Result"
                value={formData.Result}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
                required
              />
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          onClick={sendUpdate}
        >
          Send Update Request
        </button>
      </form>
    </div>
  );
}
