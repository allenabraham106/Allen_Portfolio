/**
 * Decorative background — robot arm + soft glows (pointer-events none).
 * Respects prefers-reduced-motion.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg__orb ambient-bg__orb--a" />
      <div className="ambient-bg__orb ambient-bg__orb--b" />
      <svg
        className="ambient-bg__svg"
        viewBox="0 0 420 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ambient-arm-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.45)" />
            <stop offset="55%" stopColor="rgba(192, 132, 252, 0.28)" />
            <stop offset="100%" stopColor="rgba(120, 60, 180, 0.2)" />
          </linearGradient>
        </defs>
        <g className="ambient-bg__arm-root">
          {/* Base / pedestal */}
          <path
            className="ambient-bg__stroke"
            d="M 118 312 L 118 268 Q 118 252 134 248 L 246 248 Q 262 252 262 268 L 262 312"
            stroke="url(#ambient-arm-stroke)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="190" cy="252" rx="62" ry="10" stroke="url(#ambient-arm-stroke)" strokeWidth="1.2" />
          {/* Tower */}
          <path
            className="ambient-bg__stroke"
            d="M 168 248 L 172 168 Q 174 148 190 142 L 194 140"
            stroke="url(#ambient-arm-stroke)"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
          {/* Shoulder + upper link */}
          <g className="ambient-bg__joint-shoulder" style={{ transformOrigin: "194px 140px" }}>
            <path
              className="ambient-bg__stroke"
              d="M 194 140 L 268 118 Q 292 112 308 128 L 332 168"
              stroke="url(#ambient-arm-stroke)"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="194" cy="140" r="7" stroke="url(#ambient-arm-stroke)" strokeWidth="1.2" />
            {/* Elbow + forearm */}
            <g className="ambient-bg__joint-elbow" style={{ transformOrigin: "332px 168px" }}>
              <path
                className="ambient-bg__stroke"
                d="M 332 168 L 352 228 L 364 278"
                stroke="url(#ambient-arm-stroke)"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="332" cy="168" r="6" stroke="url(#ambient-arm-stroke)" strokeWidth="1.2" />
              {/* Simple gripper */}
              <path
                className="ambient-bg__stroke"
                d="M 356 272 L 348 302 M 364 278 L 376 298 M 360 284 L 384 288"
                stroke="url(#ambient-arm-stroke)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
