import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useProject } from "../../../context/ProjectContext";
import { useFirestore } from "../../../hooks/useFirestore";

const AdminProjectsCards = () => {
  const projectCtx = useProject();
  const { updateDocument, deleteDocument, deleteImage } = useFirestore("projects");

  // ✅ make safe values (prevents "not a function")
  const projects = projectCtx?.projects || [];
  const loading = projectCtx?.loading || false;
  const refreshProjects =
    typeof projectCtx?.refreshProjects === "function"
      ? projectCtx.refreshProjects
      : async () => {}; // fallback safe function

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    gitLink: "",
    technologiesText: "",
  });

  useEffect(() => {
    // ✅ only call if it's a function (it is, because fallback exists)
    if (!projects?.length) refreshProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      description: p.description || "",
      gitLink: p.gitLink || "",
      technologiesText: Array.isArray(p.technologies) ? p.technologies.join(", ") : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", description: "", gitLink: "", technologiesText: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.description.trim()) return toast.error("Description is required");

    try {
      const technologies = form.technologiesText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await updateDocument(editingId, {
        title: form.title.trim(),
        description: form.description.trim(),
        gitLink: form.gitLink.trim(),
        technologies,
      });

      toast.success("Project updated ");
      cancelEdit();

      // ✅ safe refresh
      await refreshProjects();
    } catch (err) {
      toast.error(err?.message || "Update failed ");
    }
  };

  const handleDelete = async (p) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    try {
      if (Array.isArray(p.imagePaths) && p.imagePaths.length > 0 && deleteImage) {
        await Promise.allSettled(p.imagePaths.map((path) => deleteImage(path)));
      }

      await deleteDocument(p.id);
      toast.success("Project deleted ");

      // ✅ safe refresh
      await refreshProjects();
    } catch (err) {
      toast.error(err?.message || "Delete failed ");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Projects (Admin)</h2>

        {/* ✅ safe refresh */}
        <button
          type="button"
          onClick={() => refreshProjects()}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-600">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => {
            const isEditing = editingId === p.id;

            return (
              <div
                key={p.id}
                className="border rounded-lg p-4 bg-white shadow-sm space-y-3"
              >
                {/* Title */}
                {isEditing ? (
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded font-semibold"
                  />
                ) : (
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                )}

                {/* Description */}
                {isEditing ? (
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
                )}

                {/* GitHub */}
                {isEditing ? (
                  <input
                    name="gitLink"
                    value={form.gitLink}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="GitHub Link"
                  />
                ) : p.gitLink ? (
                  <a
                    href={p.gitLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 font-semibold hover:underline"
                  >
                    View GitHub →
                  </a>
                ) : (
                  <p className="text-sm text-gray-400">No GitHub link</p>
                )}

                {/* Technologies */}
                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-1">Technologies</p>

                  {isEditing ? (
                    <input
                      name="technologiesText"
                      value={form.technologiesText}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="React, Firebase, Tailwind"
                    />
                  ) : Array.isArray(p.technologies) && p.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {p.technologies.slice(0, 8).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">—</p>
                  )}
                </div>

                {/* Thumbnails */}
                {Array.isArray(p.imageUrls) && p.imageUrls.length > 0 && (
                  <div className="flex gap-2 flex-wrap pt-1">
                    {p.imageUrls.slice(0, 4).map((url, idx) => (
                      <img
                        key={`${p.id}_${idx}`}
                        src={url}
                        alt="thumb"
                        className="w-12 h-12 object-cover rounded border"
                        loading="lazy"
                      />
                    ))}
                    {p.imageUrls.length > 4 && (
                      <span className="text-xs text-gray-500 self-center">
                        +{p.imageUrls.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                {isEditing ? (
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="w-full px-3 py-2 bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="w-full px-3 py-2 bg-gray-200 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p)}
                      className="w-full px-3 py-2 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminProjectsCards;
