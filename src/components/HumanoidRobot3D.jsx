import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";

/**
 * Procedural 3D humanoid robot — clean white panels with gunmetal accents
 * so it pops against the dark site, purple reserved for the glowing joints,
 * eyes, and chest light. Idle bob, cursor head-tracking, periodic wave.
 * Interactive: hover flares the eyes, click triggers a random reaction
 * (wave / spin / hop).
 */

const COLORS = {
  panel: "#e8eaee",
  dark: "#2e343c",
  joint: "#a855f7",
  jointEmissive: "#7c3aed",
  visor: "#101217",
  eye: "#c084fc",
};

function PanelMaterial() {
  return <meshStandardMaterial color={COLORS.panel} roughness={0.35} metalness={0.15} />;
}

function DarkMaterial() {
  return <meshStandardMaterial color={COLORS.dark} roughness={0.45} metalness={0.4} />;
}

function JointMaterial() {
  return (
    <meshStandardMaterial
      color={COLORS.joint}
      emissive={COLORS.jointEmissive}
      emissiveIntensity={0.35}
      roughness={0.4}
      metalness={0.2}
    />
  );
}

/** Glowing actuator disc, axis along X (faces sideways). */
function JointDisc({ position, radius = 0.18, thickness = 0.14 }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[radius, radius, thickness, 24]} />
        <JointMaterial />
      </mesh>
      <mesh>
        <cylinderGeometry args={[radius * 0.45, radius * 0.45, thickness + 0.02, 20]} />
        <DarkMaterial />
      </mesh>
    </group>
  );
}

function Antenna({ side }) {
  const s = side === "right" ? 1 : -1;
  return (
    <group position={[s * 0.15, 0.4, 0]} rotation={[0, 0, -s * 0.55]}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
        <JointMaterial />
      </mesh>
      <mesh position={[0, 0.31, 0]}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <JointMaterial />
      </mesh>
    </group>
  );
}

function Head({ headRef, eyeMatsRef }) {
  return (
    <group ref={headRef} position={[0, 3.55, 0]}>
      {/* neck */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.22, 16]} />
        <DarkMaterial />
      </mesh>
      <RoundedBox args={[0.6, 0.4, 0.48]} radius={0.09} smoothness={4} position={[0, 0.2, 0]}>
        <PanelMaterial />
      </RoundedBox>
      {/* visor */}
      <RoundedBox args={[0.46, 0.16, 0.1]} radius={0.05} smoothness={4} position={[0, 0.2, 0.22]}>
        <meshStandardMaterial color={COLORS.visor} roughness={0.2} metalness={0.7} />
      </RoundedBox>
      {/* eyes */}
      {[-0.11, 0.11].map((x, i) => (
        <mesh key={x} position={[x, 0.2, 0.27]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial
            ref={(m) => {
              eyeMatsRef.current[i] = m;
            }}
            color={COLORS.eye}
            emissive={COLORS.eye}
            emissiveIntensity={2.2}
          />
        </mesh>
      ))}
      <Antenna side="left" />
      <Antenna side="right" />
    </group>
  );
}

function Arm({ side, armRef, elbowRef }) {
  const s = side === "right" ? 1 : -1;
  return (
    <group ref={armRef} position={[s * 0.68, 3.2, 0]}>
      <JointDisc position={[s * 0.05, 0, 0]} radius={0.2} thickness={0.15} />
      {/* upper arm */}
      <mesh position={[0, -0.34, 0]}>
        <capsuleGeometry args={[0.11, 0.4, 4, 12]} />
        <PanelMaterial />
      </mesh>
      <group ref={elbowRef} position={[0, -0.64, 0]}>
        <JointDisc position={[s * 0.02, 0, 0]} radius={0.13} thickness={0.13} />
        {/* forearm */}
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.12, 0.32, 4, 12]} />
          <DarkMaterial />
        </mesh>
        {/* hand */}
        <RoundedBox args={[0.18, 0.24, 0.17]} radius={0.05} smoothness={4} position={[0, -0.6, 0]}>
          <DarkMaterial />
        </RoundedBox>
      </group>
    </group>
  );
}

function Leg({ side }) {
  const s = side === "right" ? 1 : -1;
  return (
    <group position={[s * 0.28, 2.0, 0]}>
      <JointDisc position={[s * 0.18, 0, 0]} radius={0.19} thickness={0.15} />
      {/* thigh */}
      <mesh position={[0, -0.38, 0]}>
        <capsuleGeometry args={[0.145, 0.45, 4, 12]} />
        <PanelMaterial />
      </mesh>
      <JointDisc position={[s * 0.15, -0.78, 0]} radius={0.16} thickness={0.14} />
      {/* shin */}
      <mesh position={[0, -1.2, 0]}>
        <capsuleGeometry args={[0.12, 0.5, 4, 12]} />
        <PanelMaterial />
      </mesh>
      {/* foot */}
      <RoundedBox args={[0.32, 0.22, 0.6]} radius={0.06} smoothness={4} position={[0, -1.75, 0.1]}>
        <DarkMaterial />
      </RoundedBox>
      {/* toe cap */}
      <RoundedBox args={[0.28, 0.16, 0.18]} radius={0.05} smoothness={4} position={[0, -1.77, 0.38]}>
        <JointMaterial />
      </RoundedBox>
    </group>
  );
}

function Torso({ coreMatRef }) {
  return (
    <group>
      {/* chest */}
      <RoundedBox args={[1.1, 1.0, 0.62]} radius={0.14} smoothness={4} position={[0, 2.85, 0]}>
        <PanelMaterial />
      </RoundedBox>
      {/* chest vent */}
      <RoundedBox args={[0.52, 0.46, 0.06]} radius={0.04} smoothness={4} position={[0, 2.72, 0.31]}>
        <DarkMaterial />
      </RoundedBox>
      {/* status light — pulses */}
      <mesh position={[0, 3.12, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
        <meshStandardMaterial
          ref={coreMatRef}
          color={COLORS.eye}
          emissive={COLORS.eye}
          emissiveIntensity={1.6}
        />
      </mesh>
      {/* waist */}
      <mesh position={[0, 2.42, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.18, 20]} />
        <DarkMaterial />
      </mesh>
      {/* pelvis */}
      <RoundedBox args={[0.78, 0.42, 0.5]} radius={0.1} smoothness={4} position={[0, 2.12, 0]}>
        <DarkMaterial />
      </RoundedBox>
    </group>
  );
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

const REACTIONS = ["wave", "spin", "hop"];
const REACTION_DURATION = { wave: 1.6, spin: 1.2, hop: 1.0 };
const BASE_YAW = -0.35;

function Robot({ reducedMotion }) {
  const root = useRef();
  const head = useRef();
  const armR = useRef();
  const elbowR = useRef();
  const armL = useRef();
  const elbowL = useRef();
  const eyeMats = useRef([]);
  const coreMat = useRef();

  const mouse = useRef({ nx: 0, ny: 0 });
  const hovered = useRef(false);
  const reaction = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ny = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "";
    };
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    const p = mouse.current;

    // reaction overrides
    let spinOffset = 0;
    let hopOffset = 0;
    let reactWave = 0;
    const r = reaction.current;
    if (r) {
      if (r.start === null) r.start = t;
      const prog = (t - r.start) / REACTION_DURATION[r.type];
      if (prog >= 1) {
        reaction.current = null;
      } else if (r.type === "spin") {
        spinOffset = smoothstep(prog) * Math.PI * 2;
      } else if (r.type === "hop") {
        hopOffset = Math.abs(Math.sin(prog * Math.PI * 2)) * 0.3 * (1 - prog * 0.45);
      } else {
        // wave: quick ramp in/out envelope
        reactWave =
          prog < 0.18
            ? smoothstep(prog / 0.18)
            : prog > 0.82
              ? smoothstep((1 - prog) / 0.18)
              : 1;
      }
    }

    // idle bob + turn toward cursor
    root.current.position.y = Math.sin(t * 1.4) * 0.04 + hopOffset;
    root.current.rotation.y = BASE_YAW + p.nx * 0.22 + spinOffset;

    // head tracks cursor; perks up slightly when hovered
    head.current.rotation.y = p.nx * 0.45;
    head.current.rotation.x = p.ny * 0.22;
    head.current.rotation.z += ((hovered.current ? 0.08 : 0) - head.current.rotation.z) * 0.1;

    // wave every ~9s, or immediately when clicked
    const cycle = t % 9;
    let env = 0;
    if (cycle < 1) env = cycle;
    else if (cycle < 3.2) env = 1;
    else if (cycle < 4.2) env = 4.2 - cycle;
    env = Math.max(smoothstep(Math.min(Math.max(env, 0), 1)), reactWave);

    armR.current.rotation.z = env * 2.15 + Math.sin(t * 1.2) * 0.05;
    elbowR.current.rotation.z = env * (0.35 + Math.sin(t * 7) * 0.5);

    // left arm gentle idle sway
    armL.current.rotation.x = Math.sin(t * 1.2) * 0.07;
    elbowL.current.rotation.x = Math.sin(t * 1.2 + 0.8) * 0.05;

    // eyes flare on hover; chest light pulses
    const eyeTarget = hovered.current ? 5 : 2.2;
    eyeMats.current.forEach((m) => {
      if (m) m.emissiveIntensity += (eyeTarget - m.emissiveIntensity) * 0.12;
    });
    if (coreMat.current) {
      coreMat.current.emissiveIntensity = 1.3 + Math.sin(t * 2.4) * 0.6;
    }
  });

  return (
    <group
      ref={root}
      rotation={[0, BASE_YAW, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        hovered.current = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        hovered.current = false;
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!reaction.current) {
          reaction.current = {
            type: REACTIONS[Math.floor(Math.random() * REACTIONS.length)],
            start: null,
          };
        }
      }}
    >
      <Head headRef={head} eyeMatsRef={eyeMats} />
      <Torso coreMatRef={coreMat} />
      <Arm side="right" armRef={armR} elbowRef={elbowR} />
      <Arm side="left" armRef={armL} elbowRef={elbowL} />
      <Leg side="right" />
      <Leg side="left" />
    </group>
  );
}

export default function HumanoidRobot3D() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0.8, 2.5, 6.6], fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ camera }) => camera.lookAt(0, 2.05, 0)}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 7, 5]} intensity={2.0} />
      <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#a855f7" />
      <pointLight position={[-2.5, 1.5, 3]} intensity={5} color="#a855f7" distance={9} />
      <Robot reducedMotion={reducedMotion} />
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.45}
        scale={5.5}
        blur={2.4}
        far={3}
        color="#1b0b33"
      />
    </Canvas>
  );
}
