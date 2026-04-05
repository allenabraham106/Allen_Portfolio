// Edit your details here — used across the portfolio

export const site = {
  name: "Allen Abraham",
  title: "Allen Abraham | Portfolio",
  tagline: "Student at the University of Waterloo.",
  avatar: "https://avatars.githubusercontent.com/u/112788997?v=4",
  // Resume: filename in public/ folder, or full URL (e.g. Google Drive)
  resumeUrl: "Allen_Resume_Robotics.pdf",
};

export const social = [
  { href: "https://www.linkedin.com/in/allen-abraham-4711082a4/", label: "LinkedIn", icon: "LinkedIn" },
  { href: "https://github.com/allenabraham106", label: "GitHub", icon: "GitHub" },
  { href: "https://x.com/allenk_Abraham", label: "X", icon: "X" },
];

// Tech stack — languages & tools you're comfortable with (edit to match your resume)
/** Short blurbs on what you're actively building or learning — great for recruiters scanning the page */
export const currentFocus = [
  {
    title: "Drone Path Planning — Farm Autonomy",
    context: "Personal project · Agtech",
    description:
      "Building an autonomous path planning stack for agricultural drones in Python (A*). Goal: optimize coverage routing over farm fields—think efficient irrigation and spray paths—with obstacle avoidance, inspired by ag automation startups.",
    tags: ["Python", "A*", "Path Planning"],
  },
  {
    title: "PDU Hardware-in-the-Loop Testing",
    context: "UW Formula Electric",
    description:
      "Developing HIL test infrastructure for the Power Distribution Unit on our electric race car: simulating real electrical loads so we can validate firmware behavior on the bench before on-vehicle deployment.",
    tags: ["STM32", "Embedded C", "HIL", "CAN Bus"],
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
