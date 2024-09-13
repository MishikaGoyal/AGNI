'use client'
import Navbar1 from "@/app/Components/Navbar1";

export default function Page() {
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
    <div className="min-h-screen flex flex-col">
      <Navbar1 />

      <div className="relative flex flex-col items-center justify-center mt-10">
        <h1 className="text-xl font-extrabold text-center mb-5">
          Get All your School Information <br />
          and upgrade your school to standard if not
        </h1>
        <video
          src="video2.mp4"
          className="rounded-xl opacity-80 w-full max-w-3xl"
          loop
          autoPlay
          muted
        ></video>
      </div>

      <div className="flex flex-wrap justify-center mt-20 gap-10 px-4">
        {/* Card 1 */}
        <div className="card bg-base-100 image-full w-full max-w-sm shadow-xl">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2016/02/06/09/56/science-1182713_1280.jpg"
              alt="Know Your School"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Know Your School</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">See Now</button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col w-full max-w-xl gap-4">
          <p className="text-justify">
            A feature that helps analyze whether a school is "odd" or "standard" involves a machine learning model that evaluates various school attributes...
          </p>
          <button className="btn btn-primary self-end">
            See Now
          </button>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 image-full w-full max-w-sm shadow-xl">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2024/02/28/03/55/ai-generated-8601128_1280.png"
              alt="Mark Updates"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Mark Updates</h2>
            <p>If any changes are made by you in your school in the time period. Do update us!</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => sendMessage("/api/sendmessage1")}
                className="btn btn-primary"
              >
                Update Now
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col w-full max-w-xl gap-4">
          <p className="text-justify">
            An "Update School Information" feature allows users to modify and update key data points about a school's attributes...
          </p>
          <button
            onClick={() => sendMessage("/api/sendmessage2")}
            className="btn btn-primary self-end"
          >
            Make Request
          </button>
        </div>

        {/* Card 5 */}
        <div className="card bg-base-100 image-full w-full max-w-sm shadow-xl">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
              alt="Request Resources"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Request Resources</h2>
            <p>Any resources required for upgrading your school from odd structure to standard. Send us a request, and we will help you!</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Request Now</button>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className="flex flex-col w-full max-w-xl gap-4">
          <p className="text-justify">
            The "Guidelines for Upgradation" feature provides schools with a comprehensive set of actionable guidelines to help them transition...
          </p>
          <button className="btn btn-primary self-end">Know Now</button>
        </div>
      </div>
    </div>
  );
}
