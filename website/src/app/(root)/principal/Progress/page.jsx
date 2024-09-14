"use client";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    problem: "",
    areaOfProblem: "",
    stepsTaken: "",
    proofFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("schoolName", formData.schoolName);
    data.append("problem", formData.problem);
    data.append("areaOfProblem", formData.areaOfProblem);
    data.append("stepsTaken", formData.stepsTaken);
    data.append("proofFile", formData.proofFile);

    const response = await fetch("/api/submit-problem", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Error submitting form.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Report School Problem
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="schoolName">
          School Name:
        </label>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="problem">
          Problem in the School:
        </label>
        <textarea
          name="problem"
          value={formData.problem}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="areaOfProblem"
        >
          Area of Problem:
        </label>
        <select
          name="areaOfProblem"
          value={formData.areaOfProblem}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an area</option>
          <option value="teacher-shortage">Teacher Shortage</option>
          <option value="furniture-shortage">Furniture Shortage</option>
          <option value="other-facility">Other Facility</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="stepsTaken">
          Steps Taken to Address the Problem:
        </label>
        <textarea
          name="stepsTaken"
          value={formData.stepsTaken}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" htmlFor="proofFile">
          Proof of Improvement (Image or PDF):
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        onClick={() => sendMessage("/api/sendmessage1")}
      >
        Submit
      </button>
    </form>
  );
};

export default Page;
