import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";
import EducationAdminTable from './display/EducationAdminTable';

const EducationEditor = () => {
  const { addDocument } = useFirestore("education");

  const [education, setEducation] = useState({
    institute: "",
    qualification: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !education.institute ||
      !education.qualification ||
      !education.startDate ||
      !education.endDate
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDocument({
        institute: education.institute.trim(),
        qualification: education.qualification.trim(),
        startDate: education.startDate,
        endDate: education.endDate,
      });

      toast.success("Education added successfully ");

      setEducation({
        institute: "",
        qualification: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      toast.error("Failed to add education ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= Add Education Form ================= */}
      <div className="max-w-3xl bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Add Education Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Institute / Campus
            </label>
            <input
              type="text"
              name="institute"
              value={education.institute}
              onChange={handleChange}
              placeholder="ESOFT Metro Campus"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Qualification / Program
            </label>
            <input
              type="text"
              name="qualification"
              value={education.qualification}
              onChange={handleChange}
              placeholder="Higher National Diploma in Computer Software Engineering"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Start Date
              </label>
              <input
                type="month"
                name="startDate"
                value={education.startDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                End Date
              </label>
              <input
                type="month"
                name="endDate"
                value={education.endDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg"
          >
            {loading ? "Saving..." : "Save Education"}
          </button>
        </form>
      </div>

      {/* ================= Education Table ================= */}
      <EducationAdminTable />
    </div>
  );
};

export default EducationEditor;

