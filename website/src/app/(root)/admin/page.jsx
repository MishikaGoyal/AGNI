"use client";
import Navbar1 from "@/app/Components/Navbar1";
import Link from "next/link";

const SearchBar = dynamic(() => import("@/app/Components/Searchbar"), {
  ssr: false,
});

export default function Page() {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async () => {
    if (!file) {
      alert("You need to upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/result", {
        cache: "no-store",
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.flag === false) {
        alert("Data already exists");
      } else if (responseData.flag === true) {
        alert("Data added succesfully");
      } else {
        alert("Error is uploading data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (schoolData) => setSelectedSchool(schoolData);

  const statistics = useMemo(
    () => [
      { icon: <LiaChalkboardTeacherSolid />, title: "Teachers", value: "31K" },
      { icon: <PiStudent />, title: "Students", value: "4,200" },
      { icon: <GrResources />, title: "Schools", value: "1,200" },
    ],
    []
  );

  return (
    <div className="min-w-max">
      <div>
        <Navbar1 text={"ADMIN"} />
        <div className="flex flex-col md:flex-row items-center justify-evenly mt-12 space-y-4 md:space-y-0 md:space-x-8">
          <h1 className="tracking-in-expand-fwd text-xl font-extrabold text-center md:text-left">
            Manage School Resources & Requests Efficiently
          </h1>
          <Image
            src="/img11.jpg"
            width={400}
            height={200}
            className="rounded-xl shadow-black"
          />
        </div>

      <Navbar1 text={"ADMIN"}/>

      <p className="tracking-in-expand-fwd mt-[20px] ml-[40px] text-xl">
        The beautiful thing about learning is that no one can take it away from you.
      </p>

      <div className="flex flex-wrap justify-between mt-[500px] px-10 gap-8 relative">
        {/* Reusable Card Component */}
        <Card
          title="Analyse Structure"
          description="Get to know the structure of schools."
          imageSrc="/analyse.jpg"
          buttonText="Analyse Now"
          modalId="my_modal_1"
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />

        <Card
          title="Updates"
          description="See the updates by principal."
          imageSrc="/update.jpg"
          buttonText="See Now"
        />

        <Card
          title="Resource Allocation"
          description="See the list of schools that makes the request"
          imageSrc="/resource.jpg"
          buttonText="See Now"
        />
      </div>

          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-xl overflow-hidden">
            <figure>
              <img
                src="/img10.jpg"
                alt="View Requests"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-1/3 p-4">
              <h2 className="card-title text-xl font-semibold">Check Requests</h2>
              <p className="mt-2 text-sm">Manage all requests made by the schools and take action as needed.</p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="/admin/requests">
                  <button className="btn btn-primary">View Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, description, imageSrc, buttonText, modalId, handleFileChange, handleSubmit }) => (
  <div className="card bg-base-100 image-full w-[380px] shadow-xl animate-fade-in-up">
    <figure>
      <Image src={imageSrc} alt={title} width={380} height={250} className="rounded-xl" loading="lazy" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <div className="card-actions justify-end">
        {modalId ? (
          <>
            <button
              className="wobble-hor-bottom btn bg-blue-700 text-white"
              onClick={() => document.getElementById(modalId).showModal()}
            >
              {buttonText}
            </button>
            <dialog id={modalId} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Submit Report</h3>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs mt-[20px]"
                  onChange={handleFileChange}
                />
                <div className="modal-action">
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        ) : (
          <button className="wobble-hor-bottom btn btn-primary">{buttonText}</button>
        )}
      </div>
    </div>
  </div>
);
