import PathPlanningCanvas from "./PathPlanningCanvas";

/**
 * Decorative background — soft glows, aurora sweep, ambient path field.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <PathPlanningCanvas />
      <div className="ambient-bg__aurora" />
      <div className="ambient-bg__orb ambient-bg__orb--a" />
      <div className="ambient-bg__orb ambient-bg__orb--b" />
      <div className="ambient-bg__orb ambient-bg__orb--c" />
    </div>
  );
}
