import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Mail, FileText, Code2, GraduationCap, Layers } from "lucide-react";
import { useAuth } from "../../contaxt/AuthContext";
import { toast } from "react-toastify";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.info("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    //  Full height screen + prevent body scrolling
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-black text-gray-900">Admin Panel</h2>
        </div>

        {/*  Sidebar scroll */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            <AdminLink to="/admin/contact" icon={<Mail size={18} />} label="Contact" />
            <AdminLink to="/admin/cv" icon={<FileText size={18} />} label="CV" />
            <AdminLink to="/admin/languages" icon={<Code2 size={18} />} label="Languages" />
            <AdminLink to="/admin/education" icon={<GraduationCap size={18} />} label="Education" />
            <AdminLink to="/admin/projects" icon={<Layers size={18} />} label="Projects" />
          </nav>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/*  Fixed Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="cursor-pointer text-sm font-semibold text-red-600 hover:underline"
          >
            Logout
          </button>
        </header>

        {/*  Only Outlet/content scrolls */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ---------------- Helper ---------------- */
function AdminLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
          isActive
            ? "bg-primary-50 text-primary-700"
            : "text-gray-700 hover:bg-gray-50"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
