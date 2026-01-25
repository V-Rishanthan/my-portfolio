import React, { useEffect, useState } from "react";
import { Download, Mail, Linkedin, Github } from "lucide-react";
import { useFirestore } from "../../hooks/useFirestore"; // ✅ adjust path if needed

const Social = () => {
  const socials = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/V-Rishanthan",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/rishanthan-v/",
    },
  ];

  const { getDocument } = useFirestore("settings");

  const [cvUrl, setCvUrl] = useState("");
  const [loadingCv, setLoadingCv] = useState(true);

  useEffect(() => {
    const loadCv = async () => {
      try {
        const data = await getDocument("cv"); // Firestore: settings/cv
        if (data?.url) setCvUrl(data.url);
      } catch (err) {
        console.error("Failed to load CV:", err);
      } finally {
        setLoadingCv(false);
      }
    };

    loadCv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">
            My Portfolio
          </h1>
          <p className="mt-2 text-gray-600">
            Download my CV, contact me, or connect on social media.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* ✅ CV Download from Firebase */}
          <a
            href={cvUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition
              ${
                loadingCv
                  ? "bg-gray-400 text-white cursor-wait"
                  : cvUrl
                  ? "bg-gray-900 text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            onClick={(e) => {
              if (!cvUrl) e.preventDefault();
            }}
          >
            <Download className="h-5 w-5" />
            {loadingCv ? "Loading CV..." : cvUrl ? "Download CV" : "CV Not Uploaded"}
          </a>

          <a
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition"
          >
            <Mail className="h-5 w-5" />
            Contact Me
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Social Media</h2>

        <div className="flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 hover:border-primary-300 hover:shadow-sm transition"
            >
              <span className="text-gray-800">{s.icon}</span>
              <span className="text-sm font-semibold text-gray-800">
                {s.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
