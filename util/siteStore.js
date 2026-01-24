const KEY = "site_content_v1";

export const defaultSiteContent = {
  hero: {
    name: "Rishanthan V.",
    title: "DIGITAL DESIGNER & DEVELOPER",
    description:
      "I help businesses and startups create exceptional digital experiences through expert UI/UX design, web and mobile application development, and SEO optimization. From concept to launch, I deliver solutions that drive real results.",
    location: "Trincomalee",
    badgeText: "Available for Freelance Projects",
    stats: [
      { label: "Expected Delivery", value: "2-4 Weeks" },
      { label: "Client Satisfaction", value: "100%" },
      { label: "Availability", value: "24/7" },
      { label: "Delivery Promise", value: "On Time" },
    ],
    quickCards: [
      { title: "React", subtitle: "Expert" },
      { title: "SEO", subtitle: "Optimization" },
      { title: "UI/UX", subtitle: "Design" },
    ],
  },

  contact: {
    email: "yourmail@gmail.com",
    phone: "+94XXXXXXXXX",
    location: "Sri Lanka",
    linkedin: "https://www.linkedin.com/in/rishanthan-v/",
    github: "https://github.com/yourusername",
  },

  portfolio: {
    cvUrl: "/cv.pdf",
    languages: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Bootstrap",
      "React Native",
      "PHP",
      "MySQL",
      "Firebase",
      "Figma",
      "Adobe XD",
    ],
    education: [
      {
        place: "ESOFT Metro Campus",
        program: "Higher National Diploma in Computer Software Engineering",
        date: "March 2023 – February 2025",
      },
      {
        place: "IAPS Campus - International Academy of Professional Studies",
        program: "Web Programming",
        date: "June 2022 – January 2023",
      },
      {
        place: "Vocational Training Authority",
        program: "NVQ Level 4 in Information & Communication Technology",
        date: "July 2018 – January 2019",
      },
    ],
    projects: [
      {
        id: 1,
        title: "Fresh Grocers Web App",
        image: "", // later use URL or uploaded image path
        technologies: ["HTML", "CSS", "JavaScript", "PHP"],
        githubUrl: "https://github.com/yourusername/fresh-grocers",
        liveUrl: "",
      },
    ],
  },
};

export function loadSiteContent() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
