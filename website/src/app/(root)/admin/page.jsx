"use client";

import { useState } from "react";
import SearchBar from "@/app/Components/Searchbar";

import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";
import { GrResources } from "react-icons/gr";
import Navbar from "@/app/Components/Navbar";

export default function Page() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("hello world");
    if (!file) {
      alert("You need to upload a file");
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/result", {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (schoolData) => {
    setSelectedSchool(schoolData);
  };

  return (
    <div>
      <div>
        <video
          src="video3.mp4"
          className=" slide-in-elliptic-left-fwd w-[700px] absolute mt-[150px] ml-[360px] rounded-xl opacity-2"
          loop
          autoPlay
          muted
        ></video>
      </div>
      <Navbar />
      <p className="tracking-in-expand-fwd mt-[20px] ml-[40px] text-xl">
        The beautiful thing about learning is that no one can take it away from
        you
      </p>

      <div>
        <div className="card bg-base-100 image-full w-[380px] shadow-xl mt-[580px] ml-[30px] ">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2018/09/26/09/07/education-3704026_1280.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Analyse structure</h2>
            <p>Get to know the structre of schools</p>
            <div className="card-actions justify-end">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className=" wobble-hor-bottom btn bg-blue-700 text-white"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Anaylse now
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Submit Report</h3>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="file-input file-input-bordered w-full max-w-xs mt-[20px]"
                  />
                  <div className="modal-action">
                    <form method="dialog" onSubmit={handleSubmit}>
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn" onClick={handleSubmit}>
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 image-full w-[380px] shadow-xl -mt-[260px] ml-[980px] absolute">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2018/07/05/16/59/students-3518726_1280.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Updates</h2>
            <p>See the updates by principal</p>
            <div className="card-actions justify-end">
              <button className=" wobble-hor-bottom btn btn-primary">
                See Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 image-full w-[400px] shadow-xl  -mt-[258px] ml-[500px] absolute">
        <figure>
          <img
            src="https://cdn.pixabay.com/photo/2020/09/24/16/50/board-5599231_1280.png"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Resource Request</h2>
          <p>See the requests made by the schools</p>
          <div className="card-actions justify-end">
            <button className=" wobble-hor-bottom btn btn-primary">
              See Now
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="stats shadow mt-[100px] w-full">
          <div className="stat">
            <div className="stat-figure text-xl">
              <LiaChalkboardTeacherSolid />
            </div>
            <div className="stat-title">Teachers</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat">
            <div className="stat-figure text-xl">
              <PiStudent />
            </div>
            <div className="stat-title">Students</div>
            <div className="stat-value">4,200</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-xl">
              <GrResources />
            </div>
            <div className="stat-title">Resources</div>
            <div className="stat-value">1,200</div>
          </div>
        </div>
      </div>
    </div>
  );
}
