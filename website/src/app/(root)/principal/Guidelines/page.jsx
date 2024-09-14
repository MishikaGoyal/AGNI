import React from 'react';
import Head from 'next/head';

// Static Data
const data = {
  infrastructurePlanning: [
    {
      title: 'Classroom Design Optimization',
      description: 'Guidelines for optimizing classroom layouts to support new standards.',
      pdfLink: 'https://samagra.education.gov.in/docs/ss_implementation.pdf',
    },
    {
      title: 'Facility Modernization',
      description: 'Best practices for upgrading facilities during the transition.',
      pdfLink: '/pdfs/facility_modernization.pdf',
    },
  ],
  gradeReconfiguration: [
    {
      title: 'Grade Clustering Techniques',
      description: 'How to efficiently reconfigure grades to match standard structures.',
      pdfLink: '/pdfs/grade_clustering.pdf',
    },
    {
      title: 'Teacher Allocation and Training',
      description: 'Strategies for reallocating teachers and providing necessary training.',
      pdfLink: '/pdfs/teacher_allocation.pdf',
    },
  ],
  communityEngagement: [
    {
      title: 'Parent and Student Workshops',
      description: 'Engaging the community with informative workshops and open discussions.',
      pdfLink: '/pdfs/parent_student_workshops.pdf',
    },
    {
      title: 'School-Community Partnerships',
      description: 'Building partnerships with local organizations to support the transition.',
      pdfLink: '/pdfs/school_community_partnerships.pdf',
    },
  ],
};

const TransitionPlatform = () => {
  return (
    <div>
      <main className="bg-black">
        {/* Header */}
        <header className="bg-violet-700 py-8 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white">School Transition Platform</h1>
            <p className="text-xl text-white mt-2">
              Guidelines, best practices, and resources for schools transitioning from odd to standard structures.
            </p>
          </div>
        </header>

        {/* Section 1: Infrastructure Planning */}
        {data.infrastructurePlanning && (
          <Section title="Infrastructure Planning" items={data.infrastructurePlanning} />
        )}

        {/* Section 2: Grade Reconfiguration */}
        {data.gradeReconfiguration && (
          <Section title="Grade Reconfiguration" items={data.gradeReconfiguration} />
        )}

        {/* Section 3: Community Engagement */}
        {data.communityEngagement && (
          <Section title="Community Engagement Strategies" items={data.communityEngagement} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-violet-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          © 2024 School Transition Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const Section = ({ title, items }) => (
  <section className="bg-violet-200 py-12">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      <ul className="space-y-6">
        {items.map((item, index) => (
          <li key={index} className="bg-white p-6 shadow-md rounded-md">
            <h3 className="text-2xl font-semibold text-violet-700">{item.title}</h3>
            <p className="text-gray-700 mt-2">{item.description}</p>
            <a
              href={item.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-800 transition"
            >
              Download PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TransitionPlatform;