import React from "react";
import { Link } from "react-router-dom";
import {

  ArrowLeft,
 
} from "lucide-react";

import Social from "./Social";
import Languages from "./Languages";
import Education from "./Education";
import Projects from "./Projects";

export default function Portfolio() {
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
        <Social />

        {/* Programming Languages & Tools */}
        <Languages />

        {/* Education */}
        <Education />

        {/* Projects */}
        <Projects />
      </main>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rishanthan V. All rights reserved.
      </footer>
    </div>
  );
}
