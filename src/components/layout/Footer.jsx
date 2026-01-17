import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary-200 bg-primary-50">

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Rishanthan V.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
