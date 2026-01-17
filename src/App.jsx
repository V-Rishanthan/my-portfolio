
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer shown on all pages */}
      <ScrollToTopButton />
      <Footer />
    </BrowserRouter>
  );
}
