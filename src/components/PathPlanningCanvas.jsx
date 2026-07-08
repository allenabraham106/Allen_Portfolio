import { useEffect, useRef } from "react";

const AGENTS = [
  { hue: 270, rest: { x: 0.82, y: 0.72 }, lag: 0.55, orbit: 0 },
  { hue: 285, rest: { x: 0.68, y: 0.58 }, lag: 0.72, orbit: 2.1 },
  { hue: 255, rest: { x: 0.88, y: 0.48 }, lag: 0.88, orbit: 4.2 },
];

const AVOID_RADIUS = 64;
const TRAIL_MAX = 48;
const LINK_DIST = 260;

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function createParticles(w, h) {
  const count = clamp(Math.floor((w * h) / 36000), 24, 64);
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.6 + Math.random() * 1.4,
    vy: 0.03 + Math.random() * 0.09,
    phase: Math.random() * Math.PI * 2,
    tw: 0.008 + Math.random() * 0.02,
  }));
}

function createAgent(seed, w, h) {
  return {
    x: seed.rest.x * w,
    y: seed.rest.y * h,
    vx: 0,
    vy: 0,
    trail: [],
    stuck: 0,
    ...seed,
  };
}

/**
 * Full-viewport ambient field — several point-mass agents weave around the
 * cursor with tangential obstacle avoidance. Decorative only.
 */
export default function PathPlanningCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onMq = (e) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onMq);

    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let agents = [];
    let particles = [];
    let tick = 0;

    const cursor = { x: 0, y: 0, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = createParticles(width, height);

      if (agents.length === 0) {
        agents = AGENTS.map((seed) => createAgent(seed, width, height));
      } else {
        agents.forEach((a) => {
          a.x = clamp(a.x, 24, width - 24);
          a.y = clamp(a.y, 24, height - 24);
        });
      }
    };

    const onMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      cursor.active = true;
    };

    const onLeave = () => {
      cursor.active = false;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const steerAgent = (agent) => {
      const margin = 56;
      let gx;
      let gy;

      if (cursor.active) {
        const orbitAngle = agent.orbit + tick * 0.012;
        const ring = 72 + agent.lag * 36;
        gx = cursor.x + Math.cos(orbitAngle) * ring;
        gy = cursor.y + Math.sin(orbitAngle) * ring;
      } else {
        gx = agent.rest.x * width;
        gy = agent.rest.y * height;
      }

      const dx = gx - agent.x;
      const dy = gy - agent.y;
      const dist = Math.hypot(dx, dy) || 1;
      const nx = dx / dist;
      const ny = dy / dist;

      let ax = nx * 0.042;
      let ay = ny * 0.042;

      if (cursor.active) {
        const odx = agent.x - cursor.x;
        const ody = agent.y - cursor.y;
        const odist = Math.hypot(odx, ody) || 1;
        const onx = odx / odist;
        const ony = ody / odist;

        if (odist < AVOID_RADIUS) {
          const push = ((AVOID_RADIUS - odist) / AVOID_RADIUS) ** 1.1;
          const tx = -ony;
          const ty = onx;
          const spin = agent.vx * tx + agent.vy * ty >= 0 ? 1 : -1;
          ax += tx * 0.11 * push * spin;
          ay += ty * 0.11 * push * spin;
          ax += onx * 0.06 * push;
          ay += ony * 0.06 * push;
        }
      }

      ax += clamp((margin - agent.x) / margin, 0, 1) * 0.035;
      ax -= clamp((agent.x - (width - margin)) / margin, 0, 1) * 0.035;
      ay += clamp((margin - agent.y) / margin, 0, 1) * 0.035;
      ay -= clamp((agent.y - (height - margin)) / margin, 0, 1) * 0.035;

      agent.vx = (agent.vx + ax) * 0.91;
      agent.vy = (agent.vy + ay) * 0.91;

      const speed = Math.hypot(agent.vx, agent.vy);
      const maxSpeed = cursor.active ? 2.8 : 1.4;
      if (speed > maxSpeed) {
        agent.vx = (agent.vx / speed) * maxSpeed;
        agent.vy = (agent.vy / speed) * maxSpeed;
      }

      if (speed < 0.12) {
        agent.stuck += 1;
        if (agent.stuck > 18) {
          const nudge = agent.orbit + tick * 0.05;
          agent.vx += Math.cos(nudge) * 0.35;
          agent.vy += Math.sin(nudge) * 0.35;
          agent.stuck = 0;
        }
      } else {
        agent.stuck = 0;
      }

      agent.x += agent.vx;
      agent.y += agent.vy;

      agent.trail.push({ x: agent.x, y: agent.y });
      if (agent.trail.length > TRAIL_MAX) agent.trail.shift();
    };

    const drawGrid = () => {
      const step = 72;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.04)";
      ctx.lineWidth = 1;
      const ox = (tick * 0.15) % step;
      const oy = (tick * 0.1) % step;
      for (let x = -step + ox; x < width + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -step + oy; y < height + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawParticles = (animate) => {
      for (const p of particles) {
        if (animate) {
          p.y -= p.vy;
          if (p.y < -4) {
            p.y = height + 4;
            p.x = Math.random() * width;
          }
        }
        const alpha = animate
          ? 0.06 + 0.18 * (0.5 + 0.5 * Math.sin(tick * p.tw + p.phase))
          : 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(275, 70%, 78%, ${alpha})`;
        ctx.fill();
      }
    };

    // Faint dashed "network" links between agents that drift close together
    const drawLinks = () => {
      ctx.save();
      ctx.setLineDash([4, 7]);
      ctx.lineWidth = 1;
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a = agents[i];
          const b = agents[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(272, 70%, 72%, ${alpha})`;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };

    const drawAgent = (agent) => {
      const stroke = `hsla(${agent.hue}, 72%, 68%, 0.42)`;
      const fill = `hsla(${agent.hue}, 80%, 74%, 0.55)`;

      if (agent.trail.length > 1) {
        for (let i = 1; i < agent.trail.length; i++) {
          const t = i / agent.trail.length;
          ctx.beginPath();
          ctx.moveTo(agent.trail[i - 1].x, agent.trail[i - 1].y);
          ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
          ctx.strokeStyle = `hsla(${agent.hue}, 70%, 68%, ${0.03 + t * 0.18})`;
          ctx.lineWidth = 0.75 + t * 0.9;
          ctx.stroke();
        }
      }

      const speed = Math.hypot(agent.vx, agent.vy);
      if (speed > 0.2) {
        const scale = 16 / speed;
        ctx.beginPath();
        ctx.moveTo(agent.x, agent.y);
        ctx.lineTo(agent.x + agent.vx * scale, agent.y + agent.vy * scale);
        ctx.strokeStyle = `hsla(${agent.hue}, 65%, 68%, 0.16)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // soft halo
      const halo = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, 14);
      halo.addColorStop(0, `hsla(${agent.hue}, 85%, 74%, 0.22)`);
      halo.addColorStop(1, `hsla(${agent.hue}, 85%, 74%, 0)`);
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.save();
      ctx.shadowColor = `hsla(${agent.hue}, 85%, 72%, 0.85)`;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };

    const step = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      if (!reducedMotionRef.current) {
        drawGrid();
        drawParticles(true);
        agents.forEach(steerAgent);
        drawLinks();
        agents.forEach(drawAgent);
      } else {
        drawParticles(false);
        agents.forEach((agent) => {
          ctx.beginPath();
          ctx.arc(agent.rest.x * width, agent.rest.y * height, 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${agent.hue}, 70%, 68%, 0.2)`;
          ctx.fill();
        });
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-bg__canvas" aria-hidden="true" />;
}
