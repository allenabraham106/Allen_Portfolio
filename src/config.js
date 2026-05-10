// Edit your details here — used across the portfolio

export const site = {
  name: "Allen Abraham",
  title: "Allen Abraham | Portfolio",
  tagline: "Applied Math & ECE (Controls & Communication) @ Waterloo.",
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
  { href: "https://www.linkedin.com/in/allen-abraham-4711082a4/", label: "LinkedIn", icon: "LinkedIn" },
  { href: "https://github.com/allenabraham106", label: "GitHub", icon: "GitHub" },
  { href: "https://x.com/allenk_Abraham", label: "X", icon: "X" },
];

// Tech stack — languages & tools you're comfortable with (edit to match your resume)
/** Short blurbs on what you're actively building or learning — great for recruiters scanning the page */
export const currentFocus = [
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
