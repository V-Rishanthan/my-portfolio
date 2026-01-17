// components/AboutSection.jsx
import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

// Import your image
import aboutImage from '../../assets/ownerImage.jpeg';

const AboutSection = () => {
  const highlights = [
     "UI/UX Design with a User-Centered Approach",
  "Web Application Development with React",
  "Mobile App Development with React Native",
  "SEO Optimization & Performance Best Practices",
  "End-to-End Project Delivery",
  "Responsive & Modern Web Design"
  ];

 const skills = [
  "UI/UX Design",
  "Web Application Development",
  "Mobile App Development",
  "React.js",
  "React Native",
  "SEO Optimization",
  "Responsive Design",
  "Prototyping"
];

  return (
    <section id='about' className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6 fontAntonio">
            <Sparkles className="h-4 w-4" />
            About Me
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 fontAntonio">
            Digital Designer & Developer
          </h2>
          
          <p className="text-xl text-gray-600 fontAntonio">
            Creating exceptional digital experiences through design and code
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div>
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src={aboutImage}
                alt="Rishanthan V - Digital Designer & Developer"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Simple Stats - REMOVED EXPERIENCE STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-black text-primary fontAntonio">100%</div>
                <div className="text-xs text-gray-600">Client Focus</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-black text-primary fontAntonio">Modern</div>
                <div className="text-xs text-gray-600">Tech Stack</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div>
            {/* Introduction */}
            <div className="mb-10">
              <h3 className="text-2xl font-black text-gray-900 mb-6 fontAntonio">
                Professional Approach
              </h3>
              
              <div className="space-y-4">
                <p className="text-gray-600 fontAntonio">
                  I specialize in creating exceptional digital experiences that combine beautiful design with functional development. My approach focuses on delivering modern, user-friendly solutions.
                </p>
                <p className="text-gray-600 fontAntonio">
                  With expertise in both design and development, I deliver complete solutions from concept to launch, ensuring every project is built with quality and attention to detail.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-10">
              <h4 className="text-xl font-black text-gray-900 mb-6 fontAntonio">
                What I Offer
              </h4>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 fontAntonio">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-10">
              <h4 className="text-xl font-black text-gray-900 mb-6 fontAntonio">
                Skills & Expertise
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium fontAntonio"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors fontAntonio"
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;