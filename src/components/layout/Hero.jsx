import React from "react";
import {
  Briefcase,
  FolderKanban,
  Mail,
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  Calendar,
  Code,
  Palette,
  Rocket,
  Users,
  Clock,
  CheckCircle,
  Zap,
  Smartphone,
  TrendingUp,
  MonitorSmartphone,
  // FolderKanban

} from "lucide-react";

// Replace with your real image
import ownerImage from "../../assets/ownerImage.jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
const skills = [
  { name: 'UI/UX Design', icon: <Palette className="h-4 w-4" /> },
  { name: 'Web App Development', icon: <Code className="h-4 w-4" /> },
  { name: 'Mobile App Development', icon: <Smartphone className="h-4 w-4" /> },
  { name: 'SEO Optimization', icon: <TrendingUp className="h-4 w-4" /> },
  { name: 'Responsive Design', icon: <MonitorSmartphone className="h-4 w-4" /> },

];


  return (
    <section id="home" className="min-h-[90vh] flex items-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - CONTENT */}
          <div className="order-2 lg:order-1">
            {/* Name and Title */}
            <div className="mb-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Briefcase className="h-4 w-4" />
                Available for Freelance Projects
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-3">
                Rishanthan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                  V.
                </span>
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-transparent rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
                  DIGITAL DESIGNER & DEVELOPER
                </h3>
                <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* Description */}
            {/* <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              I help businesses and startups create exceptional digital
              experiences through expert{" "}
              <span className="font-bold text-primary-600">UI/UX design</span>{" "}
              and{" "}
              <span className="font-bold text-primary-600">
                Framer development
              </span>
              . From concept to launch, I deliver solutions that drive results.
            </p> */}

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              I help businesses and startups create exceptional digital
              experiences through expert{" "}
              <span className="font-bold text-primary-600">UI/UX design</span>,{" "}
              <span className="font-bold text-primary-600">
                web and mobile application development
              </span>
              , and{" "}
              <span className="font-bold text-primary-600">
                SEO optimization
              </span>
              . From concept to launch, I deliver solutions that drive real
              results.
            </p>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-8">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full hover:border-primary-300 hover:shadow-sm transition-all duration-300 group"
                  >
                    <span className="text-primary-600 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <span className="text-gray-700 text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTON SECTION: Two Clear Paths */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  What would you like to explore?
                </span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Freelance Projects Button */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-primary-600 bg-gradient-to-br from-primary-50 to-white p-6 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        Hire Me for Projects
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Looking for a designer/developer for your next project?
                      </p>
                     
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold group/link"
                      >
                        Start a Project
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary-600/10 to-blue-600/10 rounded-bl-3xl"></div>
                </div>

                {/* Portfolio Content Button */}
                <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-primary-300 hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
                        <FolderKanban className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        Explore My Portfolio
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        View my design work, case studies, and development
                        projects
                      </p>
                      {/* <div className="flex items-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">12+</div>
                          <div className="text-xs text-gray-500">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">6</div>
                          <div className="text-xs text-gray-500">Case Studies</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">4</div>
                          <div className="text-xs text-gray-500">Templates</div>
                        </div>
                      </div> */}
                      <Link
                        to="/portfolio"
                        className="inline-flex items-center gap-2 text-gray-800 font-semibold group/link hover:text-primary-600"
                      >
                        View Portfolio
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-bl-3xl"></div>
                </div>
              </div>

              {/* Quick Contact Button */}
              <div className="mt-6">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 w-full bg-white border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="h-5 w-5" />
                  Quick Inquiry
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>

            {/* Updated Stats Section - REMOVED "Projects Delivered" and ADDED "Expected Delivery" */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-100">
              {/* Expected Delivery Time */}
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  2-4 Weeks
                </div>
                <div className="text-xs text-gray-500">Expected Delivery</div>
              </div>

              {/* Client Satisfaction */}
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  100%
                </div>
                <div className="text-xs text-gray-500">Client Satisfaction</div>
              </div>

              {/* Availability */}
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  24/7
                </div>
                <div className="text-xs text-gray-500">Availability</div>
              </div>

              {/* Fast Turnaround */}
              <div className="text-center group">
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  On Time
                </div>
                <div className="text-xs text-gray-500">Delivery Promise</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square relative">
                  <img
                    src={ownerImage}
                    alt="Rishanthan V. - Digital Designer & Developer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Freelance Badge on Image */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <Briefcase className="h-4 w-4 text-primary-600" />
                      <span className="font-semibold text-gray-800 text-sm">
                        Open for Work
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-full shadow-lg">
                    <MapPin className="h-5 w-5 text-primary-600" />
                    <span className="font-semibold text-gray-800">
                      Trincomalee
                    </span>
                  </div>
                </div>
              </div>

              {/* Background decorative */}
              <div className="absolute -top-8 -left-8 w-56 h-56 bg-gradient-to-br from-primary-100 to-blue-100 rounded-[3rem] -z-10 blur-xl opacity-60"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-[3rem] -z-10 blur-xl opacity-40"></div>
            </div>

            {/* Quick Stats Below Image */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-primary-200 hover:shadow-md transition-all duration-300">
                <div className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600">
                  React
                </div>
                <div className="text-xs text-gray-500">Expert</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-primary-200 hover:shadow-md transition-all duration-300">
                <div className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600">
                  SEO
                </div>
                <div className="text-xs text-gray-500">Optimization</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-primary-200 hover:shadow-md transition-all duration-300">
                <div className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600">
                  UI/UX
                </div>
                <div className="text-xs text-gray-500">Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
