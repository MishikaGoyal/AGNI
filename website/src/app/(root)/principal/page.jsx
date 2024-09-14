"use client";
import Navbar1 from "@/app/Components/Navbar1";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-w-max">
      <div>
        <Navbar1 />

        <div>
          <div>
            <h1 className="tracking-in-expand-fwd absolute mt-[250px] ml-[30px] text-xl font-extrabold">
              Get All your School Information <br></br>and upgrade your school
              to standard if not
            </h1>
            <Image
              src="/img6.jpg"
             width={400}
             height={200}
             className='absolute ml-[900px] mt-[100px]'
             
            ></Image>
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
                <div className="card-actions justify-end"></div>
              </div>
            </div>
          </div>
          <div className="mt-[600px] ml-[600px] absolute w-[600px]">
            <p className="text-justify">
              A feature that helps analyze whether a school is "odd" or
              "standard" involves a machine learning model that evaluates
              various school attributes such as infrastructure,
              student-to-teacher ratio, curriculum quality, extracurricular
              activities, safety measures, and compliance with educational
              standards. By processing these factors, the model can classify
              schools as "odd" if they deviate significantly from typical
              standards or "standard" if they meet or exceed the accepted norms.
              This analysis can provide valuable insights for stakeholders,
              enabling them to identify areas needing improvement or maintain
              high educational standards
            </p>
            <Link href="/principal/structure">
              <button className="mt-[30px] wobble-hor-bottom btn btn-primary ml-[500px] ">
                See Now
              </button>
            </Link>
          </div>
          <div className="card bg-base-100 image-full w-[380px] h-[270px] shadow-xl mt-[950px] ml-[900px] absolute">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2024/02/28/03/55/ai-generated-8601128_1280.png"
                alt="Shoes"
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">Mark Updates</h2>
              <p className="absolute mt-[40px]">
                {" "}
                If any changes made by you in your school in the time period.Do
                update us!
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="absolute mt-[950px] w-[600px] ml-[90px]">
            <p className="text-justify">
              An "Update School Information" feature allows users to modify and
              update key data points about a school's attributes, such as
              infrastructure quality, student enrollment numbers, teacher
              qualifications, safety protocols, curriculum offerings, and
              extracurricular programs. This feature ensures that the data used
              for analysis is always current and accurate, enabling the system
              to provide more reliable classifications of schools as "odd" or
              "standard." Additionally, when users update the school
              information, the machine learning model can be triggered to
              re-predict the school's classification based on the new data,
              ensuring ongoing relevance and accuracy in the analysis.
            </p>
          <Link href='principal/Progress'>  <button
              
              className="mt-[30px] wobble-hor-bottom btn btn-primary"
            >
              Update Now
            </button></Link>
          </div>

          <div className="card bg-base-100 image-full w-[380px] shadow-xl mt-[1300px] ml-[60px] absolute">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Request Resources</h2>
              <p className="absolute mt-[40px]">
                Any resources required for upgrading your school from odd
                structure to standard. Send us a request and will help you!
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="absolute mt-[1300px] w-[600px] ml-[650px]">
            <p className="text-justify">
              The "Resource Request for Upgradation to Standard School" feature
              empowers schools identified as "odd" or below standard to request
              specific resources needed to meet educational norms. This feature
              allows school administrators to submit requests for various types
              of support, such as funding for infrastructure improvements,
              learning materials, teacher training programs, technology
              upgrades, or safety equipment. By analyzing the school's current
              deficiencies and aligning them with the necessary resources, the
              system can provide targeted recommendations and facilitate direct
              communication with relevant educational authorities or donors.
              This ensures a streamlined process for schools to achieve
              standardization and improve their educational quality, ultimately
              enhancing the learning environment for students.
            </p>
            <button
              onClick={() => sendMessage("/api/sendmessage2")}
              className="mt-[20px] ml-[500px] wobble-hor-bottom btn btn-primary"
            >
              Make Request
            </button>
          </div>
          <div className="card bg-base-100 image-full w-[380px] shadow-xl mt-[1700px] ml-[900px] absolute">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2016/03/17/23/07/abstract-1264071_1280.png"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Guidelines</h2>
              <p className="absolute mt-[40px]">
                Any problem in upgrading? Go through these guidelines will help
                you for sure!
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="absolute mt-[1700px] w-[600px] ml-[90px]">
            <p className="text-justify">
              The "Guidelines for Upgradation" feature provides schools with a
              comprehensive set of actionable guidelines to help them transition
              from "odd" to "standard" status. This feature offers tailored
              recommendations based on a school's specific areas of improvement,
              such as enhancing infrastructure, implementing better teaching
              methodologies, improving student engagement, meeting safety
              standards, and adopting effective administrative practices. It
              includes step-by-step instructions, best practices, compliance
              checklists, and case studies of successful schools that have
              undergone similar transformations. By following these guidelines,
              schools can systematically address gaps and align themselves with
              established educational standards, ensuring continuous improvement
              and quality education for all students.
            </p>
           <Link href='/principal/Guidelines'><button className="mt-[30px] wobble-hor-bottom btn btn-primary">
              Know Now
            </button></Link> 
          </div>
        </div>
      </div>
    </div>
  );
}
