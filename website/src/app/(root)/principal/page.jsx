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
    <div>
      <Navbar1 />
      <h1 className="tracking-in-expand-fwd ml-[40px] mt-[20px] text-xl">WELCOME BACK!!</h1>
      <div>
        <div>
          <video
            src="video2.mp4"
            className="slide-in-elliptic-left-fwd w-[700px] absolute mt-[120px] ml-[360px] rounded-xl opacity-2"
            loop
            autoPlay
            muted
          ></video>
        </div>
        <div>
          <div className="card bg-base-100 image-full w-[380px] h-[250px] shadow-xl mt-[600px] ml-[50px] absolute">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2016/02/06/09/56/science-1182713_1280.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Know Your School</h2>

              <div className="card-actions justify-end">
                <button className="mt-[120px] wobble-hor-bottom btn btn-primary">See Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 image-full w-[380px] h-[270px] shadow-xl mt-[600px] ml-[1000px] absolute">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2024/02/28/03/55/ai-generated-8601128_1280.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Mark Updates</h2>

            <div className="card-actions justify-end">
              <button
                onClick={() => sendMessage("/api/sendmessage1")}
                className="mt-[120px] wobble-hor-bottom btn btn-primary"
              >
                Update Now
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 image-full w-[380px] shadow-xl mt-[950px] ml-[50px] absolute">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Request Resources</h2>

            <div className="card-actions justify-end">
              <button
                onClick={() => sendMessage("/api/sendmessage2")}
                className="mt-[120px] wobble-hor-bottom btn btn-primary"
              >
                Make Request
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 image-full w-[380px] shadow-xl mt-[950px] ml-[1000px] absolute">
          <figure>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/17/23/07/abstract-1264071_1280.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Guidelines</h2>

            <div className="card-actions justify-end">
              <button className="mt-[110px] wobble-hor-bottom btn btn-primary">Know Now</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 image-full w-[380px] shadow-xl mt-[800px] ml-[520px] absolute">
          <figure>
            <img
              src="https://i.pinimg.com/originals/8c/13/65/8c136550a14b3a5070bc364549d9121f.gif"
              alt="Shoes"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
