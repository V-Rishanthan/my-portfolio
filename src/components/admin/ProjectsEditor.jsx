import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";
import AdminProjectsCards from "./display/AdminProjectsCards";

const MAX_IMAGES = 20;

const emptyForm = {
  title: "",
  description: "",
  technologies: [],
  images: [], // [{ file: File|null, preview: string, id: string, source: "file"|"url" }]
  gitLink: "",
};

const ProjectsEditor = () => {
  const {
    addDocument,
    getAllDocuments,
    updateDocument,
    deleteDocument,
    uploadImage,
    deleteImage,
  } = useFirestore("projects");

  // Form state
  const [project, setProject] = useState(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [imageUrlsText, setImageUrlsText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // View/Edit state
  const [projects, setProjects] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    technologies: [],
    gitLink: "",
    existingImageUrls: [],
    existingImagePaths: [],
    newImages: [], // [{ file, preview, id }]
  });
  const [editTechInput, setEditTechInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // -------- Helpers --------
  const fetchProjects = async () => {
    try {
      setLoadingList(true);
      const data = await getAllDocuments();
      setProjects(data);
    } catch (e) {
      toast.error(e?.message || "Failed to load projects");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedCount = project.images.length;

  const canSubmit = useMemo(() => {
    return (
      project.title.trim() &&
      project.description.trim() &&
      project.images.length > 0 &&
      !isSaving
    );
  }, [project.title, project.description, project.images.length, isSaving]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remaining = MAX_IMAGES - project.images.length;
    if (remaining <= 0) return toast.error(`Maximum ${MAX_IMAGES} images allowed`);

    const limited = files.slice(0, remaining);
    const newImages = limited.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}_${Math.random()}`,
      source: "file",
    }));

    setProject((p) => ({ ...p, images: [...p.images, ...newImages] }));
    e.target.value = "";
  };

  const removeImage = (id) => {
    setProject((p) => {
      const img = p.images.find((x) => x.id === id);
      if (img?.source === "file" && img.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(img.preview);
      }
      return { ...p, images: p.images.filter((x) => x.id !== id) };
    });
  };

  const addTechnology = () => {
    const tech = techInput.trim();
    if (!tech) return;

    setProject((p) => {
      if (p.technologies.includes(tech)) return p;
      return { ...p, technologies: [...p.technologies, tech] };
    });
    setTechInput("");
  };

  const removeTechnology = (tech) => {
    setProject((p) => ({
      ...p,
      technologies: p.technologies.filter((t) => t !== tech),
    }));
  };

  const addUrlImages = () => {
    const urls = imageUrlsText
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    if (urls.length === 0) return;

    const remaining = MAX_IMAGES - project.images.length;
    if (remaining <= 0) return toast.error(`Maximum ${MAX_IMAGES} images allowed`);

    const limited = urls.slice(0, remaining);

    const urlImages = limited.map((url) => ({
      file: null,
      preview: url,
      id: `${Date.now()}_${Math.random()}`,
      source: "url",
    }));

    setProject((p) => ({ ...p, images: [...p.images, ...urlImages] }));
    setImageUrlsText("");
    toast.success("Image URLs added");
  };

  // -------- Create --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project.title.trim()) return toast.error("Project title is required");
    if (!project.description.trim()) return toast.error("Description is required");
    if (project.images.length === 0) return toast.error("At least 1 image is required");

    setIsSaving(true);

    try {
      const fileImages = project.images.filter((img) => img.file);
      const urlOnlyImages = project.images.filter((img) => !img.file);

      // Upload files
      const uploaded = await Promise.all(
        fileImages.map((img) => uploadImage(img.file, "projects"))
      ); // [{url, path}...]

      const imageUrls = [
        ...uploaded.map((x) => x.url),
        ...urlOnlyImages.map((x) => x.preview),
      ];
      const imagePaths = uploaded.map((x) => x.path);

      await addDocument({
        title: project.title.trim(),
        description: project.description.trim(),
        technologies: project.technologies,
        gitLink: project.gitLink.trim(),
        imageUrls,
        imagePaths,
      });

      toast.success("Project saved ");

      // cleanup blob urls
      project.images.forEach((img) => {
        if (img?.source === "file" && img.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }
      });

      setProject(emptyForm);
      setTechInput("");
      setImageUrlsText("");

      await fetchProjects();
    } catch (err) {
      toast.error(err?.message || "Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  // -------- Edit --------
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      title: p.title || "",
      description: p.description || "",
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      gitLink: p.gitLink || "",
      existingImageUrls: Array.isArray(p.imageUrls) ? p.imageUrls : [],
      existingImagePaths: Array.isArray(p.imagePaths) ? p.imagePaths : [],
      newImages: [],
    });
    setEditTechInput("");
  };

  const cancelEdit = () => {
    // cleanup blob previews
    editForm.newImages.forEach((img) => {
      if (img.preview?.startsWith("blob:")) URL.revokeObjectURL(img.preview);
    });
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const editAddTech = () => {
    const tech = editTechInput.trim();
    if (!tech) return;

    setEditForm((f) => {
      if (f.technologies.includes(tech)) return f;
      return { ...f, technologies: [...f.technologies, tech] };
    });
    setEditTechInput("");
  };

  const editRemoveTech = (tech) => {
    setEditForm((f) => ({
      ...f,
      technologies: f.technologies.filter((t) => t !== tech),
    }));
  };

  const editUploadImages = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentCount = editForm.existingImageUrls.length + editForm.newImages.length;
    const remaining = MAX_IMAGES - currentCount;
    if (remaining <= 0) return toast.error(`Maximum ${MAX_IMAGES} images allowed`);

    const limited = files.slice(0, remaining);

    const newImgs = limited.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${Date.now()}_${Math.random()}`,
    }));

    setEditForm((f) => ({ ...f, newImages: [...f.newImages, ...newImgs] }));
    e.target.value = "";
  };

  const removeExistingImage = (index) => {
    setEditForm((f) => ({
      ...f,
      existingImageUrls: f.existingImageUrls.filter((_, i) => i !== index),
      // existingImagePaths only matches uploaded images; safe approach: keep paths as-is
    }));
  };

  const removeNewImage = (id) => {
    setEditForm((f) => {
      const img = f.newImages.find((x) => x.id === id);
      if (img?.preview?.startsWith("blob:")) URL.revokeObjectURL(img.preview);
      return { ...f, newImages: f.newImages.filter((x) => x.id !== id) };
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;

    if (!editForm.title.trim()) return toast.error("Project title is required");
    if (!editForm.description.trim()) return toast.error("Description is required");

    setIsUpdating(true);

    try {
      // upload new images
      const uploaded = await Promise.all(
        editForm.newImages.map((img) => uploadImage(img.file, "projects"))
      );

      const newUrls = uploaded.map((x) => x.url);
      const newPaths = uploaded.map((x) => x.path);

      await updateDocument(editingId, {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        technologies: editForm.technologies,
        gitLink: editForm.gitLink.trim(),
        imageUrls: [...editForm.existingImageUrls, ...newUrls],
        // keep old paths + new paths (old paths used for deletion)
        imagePaths: [...editForm.existingImagePaths, ...newPaths],
      });

      toast.success("Project updated ");

      // cleanup previews
      editForm.newImages.forEach((img) => {
        if (img.preview?.startsWith("blob:")) URL.revokeObjectURL(img.preview);
      });

      setEditingId(null);
      await fetchProjects();
    } catch (err) {
      toast.error(err?.message || "Failed to update project");
    } finally {
      setIsUpdating(false);
    }
  };

  // -------- Delete --------
  const handleDelete = async (p) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    try {
      // Optional: delete storage images if you stored imagePaths
      if (Array.isArray(p.imagePaths) && p.imagePaths.length > 0 && deleteImage) {
        await Promise.allSettled(p.imagePaths.map((path) => deleteImage(path)));
      }

      await deleteDocument(p.id);
      toast.success("Project deleted ");
      await fetchProjects();
    } catch (err) {
      toast.error(err?.message || "Failed to delete project");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-10">
      {/* ================= Add Project ================= */}
      <section className="border rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Project Title</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          {/* Tech */}
          <div>
            <label className="block mb-1 font-medium">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, Firebase..."
                className="flex-1 p-2 border rounded"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block mb-1 font-medium">
              Project Images (1–{MAX_IMAGES})
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />

            <p className="text-xs text-gray-500 mt-1">
              Selected: {selectedCount}/{MAX_IMAGES}
            </p>

            {project.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {project.images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Project ${index + 1}`}
                        className="w-full h-32 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block mb-1 font-medium">Add image URLs (optional)</label>
              <textarea
                value={imageUrlsText}
                onChange={(e) => setImageUrlsText(e.target.value)}
                placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <button
                type="button"
                onClick={addUrlImages}
                className="mt-2 px-4 py-2 bg-gray-900 text-white rounded"
              >
                Add URLs
              </button>
            </div>
          </div>

          {/* Git */}
          <div>
            <label className="block mb-1 font-medium">GitHub Link</label>
            <input
              type="url"
              name="gitLink"
              value={project.gitLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`px-4 py-2 rounded text-white ${
              canSubmit ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
            }`}
          >
            {isSaving ? "Saving..." : `Save Project (${selectedCount} images)`}
          </button>
        </form>
      </section>

      {/* ================= View Projects ================= */}
      <section className="border rounded-lg p-5">
        {/* <AdminProjectsCards/> */}
        <AdminProjectsCards
  projects={projects}
  loading={loadingList}
  refresh={fetchProjects}
/>


      </section>
      
    </div>
  );
};

export default ProjectsEditor;
