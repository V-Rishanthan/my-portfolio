import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-primary-200 bg-primary-50">
      <div className="container mx-auto px-4 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ===== Brand / Contact ===== */}
          <div>
            <h3 className="text-lg font-black text-gray-900">
              Rishanthan V.
            </h3>

            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              Full-Stack Developer focused on building modern, scalable web
              applications.
            </p>

            {/* Address */}
            <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span>Sri Lanka</span>
            </div>

            {/* Email */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:rishanthan390@gmail.com"
                className="hover:text-primary-600 transition"
              >
                rishanthan390@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <a
                href="tel:+94 76 346 8914"
                className="hover:text-primary-600 transition"
              >
                +94 76 346 8914
              </a>
            </div>
          </div>

          {/* ===== Navigation ===== */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              Navigation
            </h4>

            <ul className="space-y-2 text-sm  text-gray-600">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-primary-600 transition mt-5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Social ===== */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              Connect
            </h4>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/V-Rishanthan"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:shadow transition"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/rishanthan-v/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:shadow transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Rishanthan V. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Built with React & Firebase
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
