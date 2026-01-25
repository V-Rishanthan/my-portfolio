import React from 'react'
import skillsImages from "../../../util/skillsImages";
const Languages = () => {
  return (
   
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
               {/* Programming Languages & Tools */}
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
            Programming Languages & Tools
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            Technologies I use for design and development.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skillsImages.map((skill) => (
              <div
                key={skill.name}
                className="group flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="h-14 w-14 object-contain mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-semibold text-gray-800 text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </section>
  )
}

export default Languages