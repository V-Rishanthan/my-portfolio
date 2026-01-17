import React from "react";
import { Link } from "react-router-dom";
import { Download, Mail, ArrowLeft, GraduationCap, Linkedin, Github } from "lucide-react";
import skillsImages from "../../util/skillsImages";
import projectsData from "../../util/projectsData"; // (unused for now)

export default function Portfolio() {
  const socials = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/yourusername",
    },
  ];

  const cvUrl = "/cv.pdf";

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
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-primary-600 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>

          <div className="text-sm font-semibold text-gray-500">Portfolio</div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 space-y-10">
        {/* 1) CV + Contact + Social */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                My Portfolio
              </h1>
              <p className="mt-2 text-gray-600">
                Download my CV, contact me, or connect on social media.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={cvUrl}
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:opacity-90 transition"
              >
                <Download className="h-5 w-5" />
                Download CV
              </a>

              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition"
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Social Media
            </h2>

            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 hover:border-primary-300 hover:shadow-sm transition"
                >
                  <span className="text-gray-800">{s.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Programming Languages & Tools */}
        <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
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

        {/* Education */}
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


        {/* Projects */}
<section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
  <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2">
    Projects
  </h2>
  <p className="text-gray-600 text-sm mb-8">
    Some of the projects I have designed and developed.
  </p>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {projectsData.map((project) => (
      <div
        key={project.title}
        className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {project.title}
          </h3>

          {/* Technologies */}
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

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-primary-600 transition"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>

            {project.live && (
              <a
                href={project.live}
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

      </main>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rishanthan V. All rights reserved.
      </footer>
    </div>
  );
}
