import { useRef, useMemo, useState, forwardRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollAnimations";

const skillCategories = [
  {
    name: "AI Core",
    color: "#00F5FF",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "ML"],
    radius: 3,
    speed: 0.15,
  },
  {
    name: "Web Dev",
    color: "#7C3AED",
    skills: ["React", "JavaScript", "HTML/CSS", "REST APIs", "TypeScript"],
    radius: 4.5,
    speed: -0.1,
  },
  {
    name: "Data",
    color: "#00FF9C",
    skills: ["SQL", "MongoDB", "Pandas", "NumPy", "Jupyter"],
    radius: 6,
    speed: 0.08,
  },
  {
    name: "Tools",
    color: "#FF6B6B",
    skills: ["Git", "Docker", "VS Code", "Linux", "GitHub"],
    radius: 7.2,
    speed: -0.06,
  },
];

const SkillNode = forwardRef<THREE.Group, {
  position: [number, number, number]; name: string; color: string; size?: number;
}>(({ position, name, color, size = 0.12 }, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.5 : 1);
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[size * 2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.15 : 0.05} />
      </mesh>
      <Billboard>
        <Text
          fontSize={hovered ? 0.22 : 0.15}
          color={hovered ? "#ffffff" : color}
          anchorY="bottom"
          position={[0, size * 2.5, 0]}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
});

SkillNode.displayName = "SkillNode";

function CategoryRing({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * category.speed;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003 + index) * 0.1;
    }
  });

  const skillPositions = useMemo(() =>
    category.skills.map((skill, i) => {
      const angle = (i / category.skills.length) * Math.PI * 2;
      const r = category.radius;
      return {
        name: skill,
        position: [
          Math.cos(angle) * r,
          (Math.random() - 0.5) * 1.5,
          Math.sin(angle) * r,
        ] as [number, number, number],
      };
    }), [category]);

  return (
    <group ref={groupRef}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[category.radius, 0.008, 8, 100]} />
        <meshBasicMaterial color={category.color} transparent opacity={0.15} />
      </mesh>
      {skillPositions.map((skill) => (
        <SkillNode
          key={skill.name}
          position={skill.position}
          name={skill.name}
          color={category.color}
        />
      ))}
    </group>
  );
}

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={1}
          transparent
          opacity={0.4}
        />
      </mesh>
      <Billboard>
        <Text fontSize={0.25} color="#ffffff" position={[0, 1.2, 0]}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff"
        >
          VEERESH.AI
        </Text>
      </Billboard>
    </group>
  );
}

function GalaxyScene() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.05) * 2;
    camera.position.z = 12 + Math.cos(state.clock.elapsedTime * 0.05) * 2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00F5FF" distance={20} />
      <CentralCore />
      {skillCategories.map((cat, i) => (
        <CategoryRing key={cat.name} category={cat} index={i} />
      ))}
    </>
  );
}

const SkillsGalaxy = () => {
  return (
    <section id="skills-galaxy" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// SKILLS GALAXY"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Interactive <span className="gradient-text">Tech Universe</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Hover over nodes to explore skills</p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto h-[500px] max-w-4xl overflow-hidden rounded-xl border border-border/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(230_50%_8%)_0%,_hsl(230_50%_2%)_100%)]" />
          <Canvas camera={{ position: [0, 3, 12], fov: 50 }}>
            <GalaxyScene />
          </Canvas>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-3">
            {skillCategories.map(cat => (
              <div key={cat.name} className="flex items-center gap-1.5 font-mono text-[10px]">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-muted-foreground">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsGalaxy;
