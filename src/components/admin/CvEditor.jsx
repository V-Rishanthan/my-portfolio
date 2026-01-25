import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";

const MAX_CV_MB = 5;

const CvEditor = () => {
  // settings collection => doc id: "cv"
  const { getDocument, setDocument, uploadImage, deleteImage } =
    useFirestore("settings");

  const [cvUrl, setCvUrl] = useState("");
  const [cvPath, setCvPath] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load current CV from Firestore: settings/cv
  useEffect(() => {
    const loadCv = async () => {
      try {
        const data = await getDocument("cv");
        if (data?.url) setCvUrl(data.url);
        if (data?.path) setCvPath(data.path);
      } catch (err) {
        toast.error(err?.message || "Failed to load CV");
      }
    };

    loadCv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;

    // Validate type
    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    // Validate size
    const maxBytes = MAX_CV_MB * 1024 * 1024;
    if (selected.size > maxBytes) {
      toast.error(`CV must be less than ${MAX_CV_MB}MB`);
      e.target.value = "";
      return;
    }

    setFile(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("Please select a PDF file");

    try {
      setLoading(true);

      //  Delete old CV from Storage (prevents unused files)
      if (cvPath) {
        await deleteImage(cvPath);
      }

      //  Upload new PDF to Storage (folder: cv/)
      const { url, path } = await uploadImage(file, "cv");

      //  Save/Update the fixed Firestore doc: settings/cv
      await setDocument("cv", { url, path });

      // Update UI
      setCvUrl(url);
      setCvPath(path);
      setFile(null);

      toast.success("CV uploaded successfully ✅");
    } catch (err) {
      toast.error(err?.message || "CV upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLocal = () => {
    setFile(null);
  };

  return (
    <div className="max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Upload / Update CV</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload a PDF CV. The latest file will be used in the portfolio download
          button.
        </p>
      </div>

      {/* Current CV */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <p className="text-sm font-semibold text-gray-800 mb-2">Current CV</p>

        {cvUrl ? (
          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-semibold underline"
          >
            View current CV
          </a>
        ) : (
          <p className="text-gray-500 text-sm">No CV uploaded yet.</p>
        )}
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select CV (PDF only, max {MAX_CV_MB}MB)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-3 border rounded"
          />
        </div>

        {/* Selected file info */}
        {file && (
          <div className="flex items-center justify-between text-sm bg-white border rounded-lg p-3">
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">{file.name}</p>
              <p className="text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveLocal}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Remove
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-gray-900 text-white rounded disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload CV"}
        </button>
      </form>
    </div>
  );
};

export default CvEditor;
