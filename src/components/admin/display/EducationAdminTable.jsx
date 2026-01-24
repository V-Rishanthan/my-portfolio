import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useEducation } from "../../../context/EducationContext";
import { useFirestore } from "../../../hooks/useFirestore";

const EducationAdminTable = () => {
  const { education, loading, refreshEducation } = useEducation();
  const { updateDocument, deleteDocument } = useFirestore("education");

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    institute: "",
    qualification: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!education?.length) refreshEducation?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (e) => {
    setEditingId(e.id);
    setForm({
      institute: e.institute || "",
      qualification: e.qualification || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ institute: "", qualification: "", startDate: "", endDate: "" });
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editingId) return;

    if (!form.institute.trim()) return toast.error("Institute is required");
    if (!form.qualification.trim()) return toast.error("Qualification is required");
    if (!form.startDate.trim()) return toast.error("Start date is required");
    if (!form.endDate.trim()) return toast.error("End date is required");

    try {
      await updateDocument(editingId, {
        institute: form.institute.trim(),
        qualification: form.qualification.trim(),
        startDate: form.startDate.trim(),
        endDate: form.endDate.trim(),
      });

      toast.success("Education updated ");
      cancelEdit();
      await refreshEducation();
    } catch (err) {
      toast.error(err?.message || "Update failed ");
    }
  };

  const handleDelete = async (item) => {
    const ok = window.confirm("Delete this education record?");
    if (!ok) return;

    try {
      await deleteDocument(item.id);
      toast.success("Education deleted ");
      await refreshEducation();
    } catch (err) {
      toast.error(err?.message || "Delete failed ");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Education (Admin)</h2>
        <button
          type="button"
          onClick={refreshEducation}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading education...</p>
      ) : education.length === 0 ? (
        <p className="text-gray-600">No education records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-700">
                <th className="p-3 border-b">Institute</th>
                <th className="p-3 border-b">Qualification</th>
                <th className="p-3 border-b">Start</th>
                <th className="p-3 border-b">End</th>
                <th className="p-3 border-b w-44">Actions</th>
              </tr>
            </thead>

            <tbody>
              {education.map((e) => {
                const isEditing = editingId === e.id;

                return (
                  <tr key={e.id} className="text-sm">
                    <td className="p-3 border-b">
                      {isEditing ? (
                        <input
                          name="institute"
                          value={form.institute}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <span className="font-semibold">{e.institute}</span>
                      )}
                    </td>

                    <td className="p-3 border-b">
                      {isEditing ? (
                        <input
                          name="qualification"
                          value={form.qualification}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <span className="text-gray-700">{e.qualification}</span>
                      )}
                    </td>

                    <td className="p-3 border-b">
                      {isEditing ? (
                        <input
                          name="startDate"
                          value={form.startDate}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="March 2023"
                        />
                      ) : (
                        <span className="text-gray-600">{e.startDate}</span>
                      )}
                    </td>

                    <td className="p-3 border-b">
                      {isEditing ? (
                        <input
                          name="endDate"
                          value={form.endDate}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                          placeholder="February 2025"
                        />
                      ) : (
                        <span className="text-gray-600">{e.endDate}</span>
                      )}
                    </td>

                    <td className="p-3 border-b">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={saveEdit}
                            className="px-3 py-2 bg-green-600 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-3 py-2 bg-gray-200 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(e)}
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(e)}
                            className="px-3 py-2 bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EducationAdminTable;
