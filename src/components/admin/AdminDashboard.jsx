import React from "react";
import { Settings, User, FileText, Code2, GraduationCap, Layers } from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Hero Section",
      desc: "Manage name, title, description, badge & location",
      icon: <User className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Contact Section",
      desc: "Update email, phone, LinkedIn & GitHub links",
      icon: <Settings className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "CV Section",
      desc: "Upload or update CV download link",
      icon: <FileText className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Languages & Tools",
      desc: "Manage programming languages & technologies",
      icon: <Code2 className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Education",
      desc: "Add and update education history",
      icon: <GraduationCap className="h-6 w-6 text-primary-600" />,
    },
    {
      title: "Projects",
      desc: "Manage portfolio projects & tech stacks",
      icon: <Layers className="h-6 w-6 text-primary-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage website content from one place
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary-50">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {card.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {card.desc}
              </p>

              <button className="text-sm font-semibold text-primary-600 hover:underline">
                Manage →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
