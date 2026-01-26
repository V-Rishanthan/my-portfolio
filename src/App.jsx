import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio/Portfolio";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import NotFound from "./pages/NotFound";
import Login from "./components/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import EditHeroForm from "./components/admin/EditHeroForm";
import EditContact from "./components/admin/EditContact";
import CvEditor from "./components/admin/CvEditor";
import LanguagesEditor from "./components/admin/LanguagesEditor";
import EducationEditor from "./components/admin/EducationEditor";
import ProjectsEditor from "./components/admin/ProjectsEditor";
import { AuthProvider } from "./contaxt/AuthContext";
import AdminRoute from "./auth/AdminRoute";
import ToastProvider from "./components/ToastProvider";

import { EducationProvider } from "./context/EducationContext";
import { ProjectContextProvider } from "./context/ProjectContext";

function AppContent() {
  const location = useLocation();

  // Hide footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<EditHeroForm />} />
          <Route path="contact" element={<EditContact />} />
          <Route path="cv" element={<CvEditor />} />
          <Route path="languages" element={<LanguagesEditor />} />
          <Route path="education" element={<EducationEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ScrollToTopButton />
      <ToastProvider />

      {/* Footer only for public pages */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EducationProvider>
        <ProjectContextProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ProjectContextProvider>
      </EducationProvider>
    </AuthProvider>
  );
}
