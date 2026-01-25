import React from 'react'
import {  GraduationCap} from "lucide-react";
const Education = () => {

      const education = [
    {
      place: "ESOFT Metro Campus",
      program: "Higher National Diploma in Computer Software Engineering",
      date: "March 2023 – February 2025",
    },
    {
      place: "IAPS Campus - International Academy of Professional Studies",
      program: "Web Programming",
      date: "June 2022 – January 2023",
    },
    {
      place: "Vocational Training Authority",
      program: "NVQ Level 4 in Information & Communication Technology",
      date: "July 2018 – January 2019",
    },
  ];

  return (
     <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-green-50">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                Education
              </h2>
              <p className="text-gray-600 text-sm">
                My academic and professional learning journey.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-600 mt-2"></div>
                  {idx !== education.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 mt-2"></div>
                  )}
                </div>

                <div className="flex-1 pb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {edu.place}
                  </h3>
                  <p className="text-gray-700 font-semibold">{edu.program}</p>
                  <p className="text-sm text-gray-500 mt-1">{edu.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
  )
}

export default Education