// Edit your details here — used across the portfolio

export const site = {
  name: "Allen Abraham",
  title: "Allen Abraham | Portfolio",
  tagline: "Applied Math & ECE (Controls & Communication) @ Waterloo.",
  email: "allenabraham59k@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/112788997?v=4",
  // Resume: filename in public/ folder, or full URL (e.g. Google Drive)
  resumeUrl: "Allen_Resume_Robotics.pdf",
};

/**
 * Optional personality bits (inspired by dense “readme” portfolios). Set any
 * top-level field to `null` to hide it.
 *
 * More ideas you can add later (no code needed until you want them):
 * - Fake `ssh user.github.io` line that copies your email to clipboard on click
 * - Waterloo degree “completion %” joke next to tagline
 * - Webring nav (← prev · ring · next →)
 * - `Last built` from CI injecting `VITE_BUILD_TIME` at build time
 * - Keyboard shortcut (press `?`) for section jump cheatsheet
 */
export const quirks = {
  /** One-line interests / identity tags */
  identityBracket: "[firmware · robotics · perception · autonomy]",
  /** Fake shell + résumé link — set to `null` to hide */
  terminalHint: null,
  /** Quote above the copyright line */
  footerQuote: {
    text: "Once you know what failure feels like, determination chases success.",
    cite: "Kobe Bryant",
  },
  /** Optional footer line — set to `null` to hide */
  carbonNote: null,
};

export const social = [
  { href: "https://www.linkedin.com/in/allenabraham106/", label: "LinkedIn", icon: "LinkedIn" },
  { href: "https://github.com/allenabraham106", label: "GitHub", icon: "GitHub" },
  { href: "https://x.com/allenk_Abraham", label: "X", icon: "X" },
];

// Tech stack — languages & tools you're comfortable with (edit to match your resume)
/**
 * Active builds — status: "active" | "up-next"
 * summary = what it is; description = the tech stack / approach
 */
export const currentFocus = [
  {
    status: "active",
    title: "Real-Time Humanoid Navigation (SORT + MPC)",
    summary:
      "Developing a hybrid tracking and receding-horizon control framework for humanoid navigation in crowd environments.",
    description:
      "Pinning raw perception data to a SORT tracker (Kalman filtering + Hungarian matching) to estimate pedestrian velocity vectors, feeding real-time constraints into a non-linear optimizer (CasADi / C++) to minimize trajectory jerk and predictively avoid dynamic collisions.",
    tags: ["C++", "Python", "MPC", "State Estimation", "CasADi"],
  },
  {
    status: "active",
    title: "Adversarial Drone Racing Simulation (MARL & Self-Play)",
    summary:
      "Building a high-speed 3D drone interception simulation in MuJoCo.",
    description:
      "Implementing multi-agent reinforcement learning (MARL) with asymmetric self-play curricula. Training a Defender drone to learn active perception constraints — keeping a target bounded in a simulated camera frame under aggressive high-G banking turns — while dealing with injected sensor latency and partial observability.",
    tags: ["MuJoCo", "Reinforcement Learning", "PyTorch", "Simulation", "MARL"],
  },
  {
    status: "up-next",
    title: "Spatial Intelligence & Grasp Planning (6DOF + 3DGS)",
    summary:
      "Transitioning a 6DOF robotic arm from static geometric pipelines to a vision-only, real-time spatial mapping stack.",
    description:
      "Utilizing 3D Gaussian Splatting (3DGS) and COLMAP to reconstruct dense 3D environments from a single moving camera feed, enabling the system to extract explicit object geometries and plan collision-free manipulation paths.",
    tags: ["3DGS", "COLMAP", "Computer Vision", "ROS2", "6DOF Manipulation"],
  },
];

export const techStackCategories = [
  {
    title: "Languages",
    skills: ["Python", "C++", "C", "TypeScript", "JavaScript"],
  },
  {
    title: "Frameworks & web",
    skills: ["React", "HTML & CSS"],
  },
  {
    title: "Tools & embedded",
    skills: ["Git", "Docker", "STM32", "Jinja"],
  },
  {
    title: "CAD & design",
    skills: ["OnShape", "SolidWorks", "Fusion 360"],
  },
];
