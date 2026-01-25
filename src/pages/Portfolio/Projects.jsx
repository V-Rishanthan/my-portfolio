// import React from 'react'

// import { Github } from "lucide-react";
// import projectsData from "../../../util/projectsData"; 
// const Projects = () => {
//   return (
//     <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
//   <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
//     Projects
//   </h2>
//   <p className="text-gray-600 text-sm mb-8">
//     Some of the projects I have designed and developed.
//   </p>

//   <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//     {projectsData.map((project) => (
//       <div
//         key={project.title}
//         className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
//       >
//         {/* Project Image */}
//         <div className="relative h-48 overflow-hidden">
//           <img
//             src={project.image}
//             alt={project.title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         </div>

//         {/* Content */}
//         <div className="p-5">
//           <h3 className="text-lg font-bold text-gray-900 mb-3">
//             {project.title}
//           </h3>

//           {/* Technologies */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {project.technologies.map((tech) => (
//               <span
//                 key={tech}
//                 className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>

//           {/* Links */}
//           <div className="flex items-center gap-4">
//             <a
//               href={project.github}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary-600 transition"
//             >
//               <Github className="h-4 w-4" />
//               GitHub
//             </a>

//             {project.live && (
//               <a
//                 href={project.live}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary-600 transition"
//               >
//                 <ExternalLink className="h-4 w-4" />
//                 Live Demo
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>
//   )
// }

// export default Projects

import React, { useMemo } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useProject } from "../../context/ProjectContext";

const Projects = () => {
  const { projects, loading } = useProject();

  // optional: sort newest first
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aTime = a?.createdAt?.seconds || 0;
      const bTime = b?.createdAt?.seconds || 0;
      return bTime - aTime;
    });
  }, [projects]);

  if (loading) {
    return (
      <section className="bg-white border rounded-2xl p-6 md:p-10">
        <p className="text-gray-600">Loading projects...</p>
      </section>
    );
  }

  if (!sortedProjects.length) {
    return (
      <section className="bg-white border rounded-2xl p-6 md:p-10">
        <p className="text-gray-600">No projects available.</p>
      </section>
    );
  }

  return (
    <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
      <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
        Projects
      </h2>

      <p className="text-gray-600 text-sm mb-8">
        Some of the projects I have designed and developed.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
          >
            {/* Project Image (ONLY ONE) */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              {Array.isArray(project.imageUrls) && project.imageUrls.length > 0 ? (
                <img
                  src={project.imageUrls[0]}   // 👈 only first image
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {project.title}
              </h3>

              {/* Technologies */}
              {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex items-center gap-4">

                    {project.gitLink && (
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary-600 transition"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}

            {
              project?.gitl
            }
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary-600 transition"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
