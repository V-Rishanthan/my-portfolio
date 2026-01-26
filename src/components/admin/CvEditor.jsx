
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFirestore } from "../../hooks/useFirestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const MAX_CV_MB = 5;

const CvEditor = () => {
  const { getDocument, setDocument } = useFirestore("settings");
  const storage = getStorage();

  const [cvUrl, setCvUrl] = useState("");
  const [cvPath, setCvPath] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ================= LOAD CV =================
  useEffect(() => {
    const loadCv = async () => {
      try {
        console.log("Loading CV from Firestore...");
        const data = await getDocument("cv");
        console.log("CV Data loaded:", data);
        
        if (data?.url) {
          setCvUrl(data.url);
          console.log("CV URL set:", data.url);
        }
        if (data?.path) {
          setCvPath(data.path);
          console.log("CV Path set:", data.path);
        }
      } catch (error) {
        console.error("Error loading CV:", error);
        toast.error(`Failed to load CV: ${error.message}`);
      }
    };
    loadCv();
  }, [getDocument]);

  // ================= CUSTOM UPLOAD FUNCTION =================
  const uploadToStorage = async (file, folder = "cv") => {
    try {
      console.log("Starting upload to Firebase Storage...");
      console.log("File:", file.name, "Size:", file.size, "Type:", file.type);
      
      // Create a unique filename
      const timestamp = Date.now();
      const fileName = `cv_${timestamp}_${file.name}`;
      const storagePath = `${folder}/${fileName}`;
      
      console.log("Storage path:", storagePath);
      
      // Create storage reference
      const storageRef = ref(storage, storagePath);
      
      // Upload file
      console.log("Uploading file...");
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Upload completed:", snapshot);
      
      // Get download URL
      console.log("Getting download URL...");
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
      
      return {
        url: downloadURL,
        path: storagePath
      };
      
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  // ================= CUSTOM DELETE FUNCTION =================
  const deleteFromStorage = async (path) => {
    try {
      if (!path) return;
      
      console.log("Deleting file from storage:", path);
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      console.log("File deleted successfully");
      
    } catch (error) {
      console.error("Delete error:", error);
      // Don't throw error if file doesn't exist
      if (error.code !== 'storage/object-not-found') {
        throw new Error(`Delete failed: ${error.message}`);
      }
    }
  };

  // ================= FILE VALIDATION =================
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      toast.error("No file selected");
      return;
    }

    console.log("File selected:", selected.name, selected.type, selected.size);

    // Check if PDF
    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = ""; // Reset input
      setFile(null);
      return;
    }

    // Check file size
    const maxBytes = MAX_CV_MB * 1024 * 1024;
    if (selected.size > maxBytes) {
      toast.error(`CV must be less than ${MAX_CV_MB}MB`);
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selected);
    toast.info(`File selected: ${selected.name}`);
  };

  // ================= UPLOAD / UPDATE =================
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please select a PDF file first");
      return;
    }

    console.log("Starting upload process...");
    console.log("Current CV Path:", cvPath);

    try {
      setLoading(true);
      setUploadProgress(10);

      // Delete old file if exists
      if (cvPath) {
        try {
          await deleteFromStorage(cvPath);
          setUploadProgress(30);
        } catch (error) {
          console.warn("Could not delete old file:", error);
          // Continue with upload even if delete fails
        }
      }

      // Upload new file
      const uploadResult = await uploadToStorage(file);
      console.log("Upload result:", uploadResult);
      setUploadProgress(80);

      // Save to Firestore
      console.log("Saving to Firestore...");
      await setDocument("cv", { 
        url: uploadResult.url, 
        path: uploadResult.path,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString()
      });
      setUploadProgress(100);

      // Update state
      setCvUrl(uploadResult.url);
      setCvPath(uploadResult.path);
      setFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      toast.success(" CV uploaded successfully!");
      console.log("CV upload completed successfully");

    } catch (error) {
      console.error("Upload process failed:", error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // ================= DELETE CV =================
  const handleDelete = async () => {
    if (!cvUrl) {
      toast.error("No CV to delete");
      return;
    }

    const ok = window.confirm("Are you sure you want to delete the CV?");
    if (!ok) return;

    try {
      setLoading(true);

      // Delete from storage
      if (cvPath) {
        await deleteFromStorage(cvPath);
      }

      // Delete from Firestore
      await setDocument("cv", null); // Or use deleteDocument if available

      // Reset state
      setCvUrl("");
      setCvPath("");
      setFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      toast.success(" CV deleted successfully!");

    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(`Delete failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-xl shadow p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Manage CV</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload or update your CV (PDF only, max {MAX_CV_MB}MB)
        </p>
      </div>

      {/* CURRENT CV SECTION */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <p className="text-sm font-semibold text-gray-800 mb-2">Current CV</p>
        
        {cvUrl ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                📄 View Current CV
              </a>
              
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm font-medium disabled:opacity-50"
              >
                Delete CV
              </button>
            </div>
            
            <div className="text-xs text-gray-500 bg-white p-2 rounded border">
              <p>File Path: {cvPath || "Not available"}</p>
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No CV uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Upload a PDF to enable CV download on your portfolio
            </p>
          </div>
        )}
      </div>

      {/* UPLOAD FORM */}
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select PDF File (max {MAX_CV_MB}MB)
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="cv-upload"
              disabled={loading}
            />
            
            <label htmlFor="cv-upload" className="cursor-pointer">
              <div className="space-y-2">
                <div className="text-blue-600">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium">
                  {file ? file.name : "Click to select PDF file"}
                </p>
                <p className="text-xs text-gray-500">
                  {file ? `Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF only, max 5MB"}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            loading || !file
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </span>
          ) : cvUrl ? (
            "Update CV"
          ) : (
            "Upload CV"
          )}
        </button>

        {/* Debug Info (Remove in production) */}
        <div className="text-xs text-gray-400 space-y-1 border-t pt-3 mt-3">
          <p>Debug Info:</p>
          <p>File Selected: {file ? "Yes" : "No"}</p>
          <p>Current CV URL: {cvUrl ? "Set" : "Not set"}</p>
          <p>Storage Path: {cvPath || "Not set"}</p>
        </div>
      </form>
    </div>
  );
};

export default CvEditor;