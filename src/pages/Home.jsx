import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import DevelopmentServices from "../components/layout/DevelopmentServices";
import ContactInfo from "../components/layout/ContactInfo";
import AboutSection from "../components/layout/AboutSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DevelopmentServices />
        <ContactInfo />
        <AboutSection />
      </main>
    </div>
  );
}
