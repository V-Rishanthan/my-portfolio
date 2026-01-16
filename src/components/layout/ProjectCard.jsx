// components/Work/ProjectCard.jsx
import React from 'react';
import { ExternalLink, Github, ArrowRight, Eye, Code } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Project Image */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-4">🎨</div>
            <p className="text-gray-600 font-medium">{project.title}</p>
          </div>
        </div>
        {/* You can replace with actual image:
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        */}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between items-center">
              <a 
                href={project.demoLink}
                className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="h-4 w-4" />
                Live Demo
              </a>
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-4">
          {project.category === 'UI/UX Design' && <span className="text-lg">🎨</span>}
          {project.category === 'Web Development' && <Code className="h-3 w-3" />}
          {project.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Button */}
        <a 
          href={project.link}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold group/link"
        >
          View Case Study
          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-500 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default ProjectCard;