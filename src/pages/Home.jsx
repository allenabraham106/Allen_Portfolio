import { useState } from "react";
import { motion } from "framer-motion";
import { site, techStackCategories } from "../config";
import { TechStackPill } from "../components/TechStackPill";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
};

const projectsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const projectItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

// GitHub-style language colors (approximate)
const LANGUAGE_COLORS = {
  python: "#3572A5",
  javascript: "#f1e05a",
  typescript: "#3178c6",
  html: "#e34c26",
  css: "#563d7c",
  "c++": "#f34b7d",
  cpp: "#f34b7d",
  c: "#555555",
  java: "#b07219",
  "c#": "#178600",
  csharp: "#178600",
  go: "#00ADD8",
  rust: "#dea584",
  ruby: "#701516",
  php: "#4F5D95",
  swift: "#F05138",
  kotlin: "#A97BFF",
  dart: "#00B4AB",
  shell: "#89e051",
  dockerfile: "#384d54",
  jupyter: "#DA5B0B",
  vue: "#41b883",
  react: "#61dafb",
  cmake: "#064F8C",
};

function languageColor(name) {
  const key = name.trim().toLowerCase();
  return LANGUAGE_COLORS[key] || "#8b949e";
}

/** @param {{ name: string, pct?: number }[]} langs */
function normalizeLanguagePcts(langs) {
  if (!langs?.length) return [];
  const allHavePct = langs.every((l) => typeof l.pct === "number");
  if (allHavePct) {
    const total = langs.reduce((s, l) => s + (l.pct ?? 0), 0);
    if (total <= 0) {
      const n = langs.length;
      return langs.map((l) => ({ name: l.name, pct: 100 / n }));
    }
    return langs.map((l) => ({
      name: l.name,
      pct: ((l.pct ?? 0) / total) * 100,
    }));
  }
  const n = langs.length;
  return langs.map((l) => ({ name: l.name, pct: 100 / n }));
}

function ProjectLanguages({ languages }) {
  const items = normalizeLanguagePcts(languages);
  if (!items.length) return null;
  return (
    <div className="project-languages">
      <div className="project-lang-bar" role="img" aria-label={`Languages: ${items.map((l) => l.name).join(", ")}`}>
        {items.map((l) => (
          <span
            key={l.name}
            className="project-lang-segment"
            style={{
              width: `${l.pct}%`,
              backgroundColor: languageColor(l.name),
            }}
            title={`${l.name} ${Math.round(l.pct)}%`}
          />
        ))}
      </div>
      <ul className="project-lang-legend">
        {items.map((l) => (
          <li key={l.name}>
            <span className="project-lang-dot" style={{ backgroundColor: languageColor(l.name) }} />
            <span className="project-lang-name">{l.name}</span>
            <span className="project-lang-pct">{Math.round(l.pct)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Experience entries — collapsed by default, expand on click
const experiences = [
  {
    id: "formula-electric",
    role: "Firmware Engineer",
    org: "University of Waterloo Formula Electric",
    meta: "September 2025 – Present · Waterloo, ON",
    image: "/images/formula-electric.png",
    imageAlt: "University of Waterloo Formula Electric car",
    bullets: [
      <>Programmed and deployed <strong>STM32-based firmware</strong> that controls the cooling of the car based on driver feedback, increasing the reliability of the car by 15%.</>,
      <>Developed embedded system <strong>control logic</strong> to control components on STM32 micro-controllers, increasing driver control and system stability.</>,
      <>Handled firmware bugs directly on the vehicle, ensuring reliable operation in a competition-based environment.</>,
    ],
  },
  {
    id: "midnight-sun",
    role: "Firmware Member",
    org: "University of Waterloo Midnight Sun",
    meta: "Sep. 2025 – Present · Waterloo, ON",
    image: null,
    bullets: [
      <>Performed DAC testing across multiple data inputs, collaborating through <strong>Git-based workflows</strong> and peer reviews.</>,
      <>Contributed to firmware builds and testing workflows using <strong>Docker</strong> to ensure reproducible builds.</>,
      <>Assisted in early-stage testing efforts to implement <strong>Jinja</strong> to simulate our hardware boards.</>,
    ],
  },
  {
    id: "forge",
    role: "Design Team Lead",
    org: "FORGE Robotics (FRC 4421)",
    meta: "May 2023 – June 2025 · Calgary, AB",
    image: "/images/forge-robotics.png",
    imageAlt: "FORGE Robotics team with competition robot (FRC 4421)",
    bullets: [
      <><strong>3D printed</strong> and iterated robot parts using <strong>OnShape, Fusion, and SolidWorks</strong>, winning engineering awards such as the <strong>Quality Award</strong> and <strong>Innovation and Control Award</strong> at international events.</>,
      <>Facilitated robot design decisions, enabling a <strong>top 20 finish in Canada</strong> and clinching a spot at the <strong>FIRST Robotics World Championship</strong>.</>,
      <>Led strategy discussions in playoff competitions at international events to consistently finish in the top 4 teams.</>,
      <>Responsible for the development of <strong>switch adapted toys for children with disabilities</strong> at Renfrew Education Service with a total value exceeding $10,000.</>,
      <>Hosted CAD workshops for <strong>20 younger students</strong> to boost CAD involvement and introduce new skills, increasing student involvement in team decisions.</>,
    ],
  },
];

// Projects (from Devpost, GitHub, etc. — add more here)
const projects = [
  {
    id: "behaviourly",
    title: "Behaviourly",
    description:
      "Interview Better, Practice Smarter, Land the Job! An AI-powered interview practice tool to help you prepare and land the role.",
    link: "https://devpost.com/software/behaviourly",
    languages: [
      { name: "Python", pct: 52 },
      { name: "TypeScript", pct: 28 },
      { name: "HTML", pct: 12 },
      { name: "CSS", pct: 8 },
    ],
  },
  {
    id: "carevoice",
    title: "CareVoice",
    description:
      "A language coach designed for Rohingya women who are new to Canadian workplace culture, helping with communication, confidence, and context.",
    link: "https://github.com/allenabraham106/AIForGood",
    languages: [
      { name: "Python", pct: 58 },
      { name: "TypeScript", pct: 32 },
      { name: "Shell", pct: 10 },
    ],
  },
  {
    id: "license-plate-recognition",
    title: "License Plate Recognition",
    description:
      "Python-based license plate recognition project — computer vision and image processing for detecting and reading license plates.",
    link: "https://github.com/allenabraham106/license_plate_recognition",
    languages: [{ name: "Python", pct: 100 }],
  },
  {
    id: "super-mega-robot",
    title: "Super Mega Robot",
    description:
      "UTRA Hackathon robot: line following plus object detection. I built the detection pipeline and recovery logic so it could re-localize and stay reliable during competition — C++ on embedded hardware.",
    link: "https://devpost.com/software/goon-machine",
    languages: [
      { name: "C++", pct: 78 },
      { name: "Python", pct: 15 },
      { name: "CMake", pct: 7 },
    ],
  },
];

export default function Home() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="page">
      <div className="container">
        <motion.section
          className="hero"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-inner">
            <div className="hero-text">
              <motion.p className="hero-label" variants={item}>
                Hi, I'm
              </motion.p>
              <motion.h1 className="hero-title" variants={item}>
                {site.name}
              </motion.h1>
              <motion.p className="hero-subtitle" variants={item}>
                {site.tagline} I build things in firmware and am interested in{" "}
                <span className="highlight">autonomy</span>,{" "}
                <span className="highlight">human-robot interaction (HRI)</span>, and{" "}
                <span className="highlight">perception</span> — and bringing them
                together in embedded systems.
              </motion.p>
              <motion.div className="hero-actions" variants={item}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Experience
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Projects
                </button>
                {site.resumeUrl && (
                  <a
                    href={site.resumeUrl.startsWith("http") ? site.resumeUrl : `${(import.meta.env.BASE_URL || "/").replace(/\/$/, "")}/${site.resumeUrl.replace(/^\//, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Resume
                  </a>
                )}
              </motion.div>
            </div>
            <motion.div className="hero-avatar" variants={item}>
              <img src={site.avatar} alt="" />
            </motion.div>
          </div>
        </motion.section>

        <section id="experience" className="experience-section">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            Experience
          </motion.h2>
          <motion.p
            className="section-intro"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            Teams and roles I'm part of.
          </motion.p>
          <motion.div
            className="experience-list"
            variants={projectsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {experiences.map((exp) => {
              const isExpanded = expandedId === exp.id;
              const hasImage = !!exp.image;
              return (
                <motion.article
                  key={exp.id}
                  className={`experience-card ${hasImage ? "experience-card--with-image" : ""} ${isExpanded ? "is-expanded" : ""}`}
                  variants={projectItem}
                >
                  <button
                    type="button"
                    className="experience-card-trigger"
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="experience-trigger-text">
                      <h3 className="experience-role">{exp.role}</h3>
                      <span className="experience-org">{exp.org}</span>
                      <span className="experience-meta">{exp.meta}</span>
                    </div>
                    <span className="experience-chevron" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="experience-card-details"
                    aria-hidden={!isExpanded}
                  >
                    {hasImage && (
                      <div className="experience-image experience-image--banner">
                        <img
                          src={`${(import.meta.env.BASE_URL || "/").replace(/\/$/, "")}${exp.image}`}
                          alt={exp.imageAlt}
                        />
                      </div>
                    )}
                    <div className="experience-content">
                      <ul className="experience-bullets">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section id="tech-stack" className="tech-stack-section">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            Tech stack
          </motion.h2>
          <motion.p
            className="section-intro"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            Languages and tools I use regularly.
          </motion.p>
          <div className="tech-stack-panel">
            <div className="tech-stack-grid">
              {techStackCategories.map((cat, i) => (
                  <motion.div
                    key={cat.title}
                    className="tech-stack-group"
                    data-tone={String((i % 3) + 1)}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <h3 className="tech-stack-group-title">
                      <span className="tech-stack-group-dot" aria-hidden />
                      {cat.title}
                    </h3>
                    <ul className="tech-stack-pills">
                      {cat.skills.map((skill) => (
                        <TechStackPill key={skill} skill={skill} />
                      ))}
                    </ul>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            Projects
          </motion.h2>
          <motion.p
            className="section-intro"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            A selection of things I've built — hackathon projects and more.
          </motion.p>

          <motion.div
            className="projects-grid"
            variants={projectsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {projects.length === 0 ? (
              <motion.div
                className="projects-empty"
                variants={projectItem}
              >
                <div className="projects-empty-icon">◇</div>
                <h3>No projects yet</h3>
                <p>
                  Add your projects in the <code>projects</code> array at the
                  top of <code>src/pages/Home.jsx</code>. Each item:{" "}
                  <code>title</code>, <code>description</code>, optional{" "}
                  <code>link</code> and <code>languages</code>.
                </p>
              </motion.div>
            ) : (
              projects.map((project, i) => (
                <motion.article
                  key={project.id || i}
                  className="project-card"
                  variants={projectItem}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  {project.languages?.length > 0 && (
                    <ProjectLanguages languages={project.languages} />
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-link"
                    >
                      View project →
                    </a>
                  )}
                </motion.article>
              ))
            )}
          </motion.div>
        </section>

        <section id="hobbies" className="hobbies-section">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            Hobbies
          </motion.h2>
          <motion.p
            className="section-intro"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            When I'm not coding or in class.
          </motion.p>
          <motion.div
            className="hobbies-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={projectsContainer}
          >
            {[
              { icon: "✈️", label: "Travel" },
              { icon: "⚽", label: "Soccer" },
              { icon: "🔬", label: "Exploring new tech" },
              { icon: "🍜", label: "Food" },
            ].map((hobby, i) => (
              <motion.div
                key={hobby.label}
                className="hobby-card"
                variants={projectItem}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <span className="hobby-icon" aria-hidden>{hobby.icon}</span>
                <span className="hobby-label">{hobby.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
