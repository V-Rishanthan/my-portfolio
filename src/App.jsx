import React from 'react';
import Navbar from '../src/components/layout/Navbar';
import Hero from '../src/components/layout/Hero';

import { Dribbble, Github, Twitter, Linkedin, Figma } from 'lucide-react';
import DevelopmentServices from './components/layout/DevelopmentServices';
import ContactInfo from './components/layout/ContactInfo';
import AboutSection from './components/layout/AboutSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
    
        <DevelopmentServices/>
        <ContactInfo/>
        <AboutSection/>
        
        {/* Optional Footer Section */}
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <p className="text-gray-600 text-sm">
                  © {new Date().getFullYear()} Duncan Robert. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Based in San Francisco, CA
                </p>
              </div>
              
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Dribbble className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Figma className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;