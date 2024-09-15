"use client";
import Navbar1 from "@/app/Components/Navbar1";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-w-max">
      <div>
        <Navbar1 text={"PRINCIPAL"} />
        <div className="flex flex-col md:flex-row items-center justify-evenly mt-12 space-y-4 md:space-y-0 md:space-x-8">
          <h1 className="tracking-in-expand-fwd text-xl font-extrabold text-center md:text-left">
            Get All your School Information <br /> and upgrade your school to
            standard
          </h1>
          <Image
            src="/img6.jpg"
            width={400}
            height={200}
            className="rounded-xl shadow-black"
          />
        </div>
        <div className="flex flex-col md:flex-row items-start justify-evenly mt-8 mb-4 p-4 bg-gray-200 shadow-lg rounded-lg border border-gray-200 w-[90%] mx-auto">
          {/* Card - 1 */}
          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-lg">
            <figure className="relative w-full h-full">
              <img
                src="https://cdn.pixabay.com/photo/2016/02/06/09/56/science-1182713_1280.jpg"
                alt="Know Your School"
                className="w-full h-full object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-xl font-semibold">
                Know Your School
              </h2>
              <Link href="/principal/structure">
                <button className="btn btn-primary mt-4">See Now</button>
              </Link>
            </div>
          </div>

          {/* Text - 1 */}
          <div className="w-full md:w-[600px] p-4  ">
            <p className="text-md text-left leading-relaxed ">
              This feature leverages a machine learning model to evaluate key
              school attributes like infrastructure, student-to-teacher ratio,
              curriculum quality, and safety measures. Schools are classified as
              "odd" if they significantly deviate from standard norms, or
              "standard" if they align with accepted educational criteria
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-evenly p-4 mb-4 shadow-lg rounded-lg bg-gray-200 w-[90%] mx-auto">
          {/* Text - 2 */}
          <div className="w-full md:w-[600px] p-4 flex items-center">
            <p className="text-md leading-relaxed">
              An "Update School Information" feature allows users to revise key
              school data, including infrastructure, enrollment, teacher
              qualifications, and safety protocols. Keeping this data current
              ensures accurate analysis and reliable school classifications.
              Updates also prompt the machine learning model to re-evaluate the
              school’s classification, maintaining accuracy.
            </p>
          </div>

          {/* Card - 2 */}
          <div className="card bg-base-100 image-full w-full md:w-[400px] h-[280px] shadow-xl rounded-xl overflow-hidden">
            <figure>
              <img
                src="https://cdn.pixabay.com/photo/2024/02/28/03/55/ai-generated-8601128_1280.png"
                alt="Shoes"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-1/3 p-4">
              <h2 className="card-title text-xl font-semibold">Mark Updates</h2>
              <p className="mt-2 text-sm">
                If any changes are made by you in your school during this
                period, please update us!
              </p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="principal/progress">
                  <button className="btn btn-primary">Update Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-evenly p-4 mb-4 bg-gray-200 shadow-lg rounded-lg border border-gray-200 w-[90%] mx-auto">
          {/* Card 3 */}
          <div className="card bg-base-100 image-full w-full md:w-[380px] h-[280px] shadow-xl rounded-xl overflow-hidden flex-shrink-0">
            <figure className="relative w-full h-full">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg"
                alt="Shoes"
                className="w-full h-[150px] object-cover"
              />
            </figure>
            <div className="card-body flex flex-col h-full p-4">
              <h2 className="card-title text-xl font-semibold">
                Request Resources
              </h2>
              <p className="mt-4 text-sm">
                Any resources required for upgrading your school from odd
                structure to standard. Send us a request and we will help you!
              </p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="/principal/algorithm">
                  <button className="btn btn-primary ">Check Resources</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Text Section - 3 */}
          <div className="w-full md:w-[600px] p-4 ">
            <p className="text-md text-left leading-relaxed">
              The Resource Request feature enables schools to request essential
              resources like educational materials, infrastructure, and
              technology. It streamlines communication between schools and
              administrators, facilitating efficient management and allocation
              of resources. This centralized platform ensures access to
              necessary tools for quality education and improves transparency in
              resource distribution.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-evenly p-4 mb-4 shadow-lg rounded-lg bg-gray-200 w-[90%] mx-auto">
          {/* Text -4 */}
          <div className="w-full md:w-[600px] flex items-center">
            <p className="text-md leading-relaxed">
              The "Guidelines for Upgradation" feature offers schools detailed
              steps to transition from "odd" to "standard" status. It includes
              customized recommendations, best practices, compliance checklists,
              and case studies to improve various aspects such as
              infrastructure, teaching methods, student engagement. By following
              these guidelines, schools can address gaps effectively, align with
              educational standards, and ensure continuous improvement and
              high-quality education.
            </p>
          </div>

          {/* Card-4 */}
          <div className="card bg-base-100 image-full w-full md:w-[380px] h-[280px] shadow-xl rounded-xl overflow-hidden">
            <figure className="w-full h-2/3">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/17/23/07/abstract-1264071_1280.png"
                alt="Guidelines"
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-col justify-between h-1/3 p-4">
              <h2 className="card-title text-xl font-semibold">Guidelines</h2>
              <p className="mt-2 text-sm">
                Any problem in upgrading? Go through these guidelines; they will
                help you for sure!
              </p>
              <div className="card-actions mt-auto flex justify-end">
                <Link href="/principal/guidelines">
                  <button className="btn btn-primary">Know How</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* sendMessage("/api/sendmessage2") */
