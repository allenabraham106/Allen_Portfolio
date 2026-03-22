import {
  SiPython,
  SiCplusplus,
  SiC,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiGit,
  SiDocker,
  SiStmicroelectronics,
  SiJinja,
  SiAutodesk,
} from "react-icons/si";
import { TbCube, TbCubeUnfolded } from "react-icons/tb";

const iconProps = {
  className: "tech-pill-icon",
  "aria-hidden": true,
  size: 18,
};

// Never use `stroke={n}` here — in SVG that sets stroke *color* to "1.5" → browser paints black.
const cadIconProps = {
  ...iconProps,
  className: "tech-pill-icon tech-pill-icon--white",
  color: "#f4f4f5",
  strokeWidth: 1.75,
};

/** @type {Record<string, import('react').ReactNode>} */
const SKILL_CONTENT = {
  Python: <SiPython {...iconProps} />,
  "C++": <SiCplusplus {...iconProps} />,
  C: <SiC {...iconProps} />,
  TypeScript: <SiTypescript {...iconProps} />,
  JavaScript: <SiJavascript {...iconProps} />,
  React: <SiReact {...iconProps} />,
  "HTML & CSS": (
    <span className="tech-pill-icons tech-pill-icons--pair" aria-hidden>
      <SiHtml5 {...iconProps} size={16} />
      <SiCss {...iconProps} size={16} />
    </span>
  ),
  Git: <SiGit {...iconProps} />,
  Docker: <SiDocker {...iconProps} />,
  STM32: <SiStmicroelectronics {...iconProps} />,
  Jinja: <SiJinja {...iconProps} />,
  // Placeholder marks (Tabler) — forced white to read like light brand marks on dark pills
  OnShape: <TbCubeUnfolded {...cadIconProps} />,
  SolidWorks: <TbCube {...cadIconProps} />,
  "Fusion 360": <SiAutodesk {...iconProps} />,
};

export function TechStackPill({ skill }) {
  const graphic = SKILL_CONTENT[skill];

  return (
    <li className="tech-pill">
      {graphic}
      <span className="tech-pill-label">{skill}</span>
    </li>
  );
}
