import { motion } from "framer-motion";

const techIcons = [
  { name: "Python", x: "10%", y: "20%", delay: 0 },
  { name: "TensorFlow", x: "85%", y: "15%", delay: 0.5 },
  { name: "React", x: "8%", y: "75%", delay: 1 },
  { name: "PyTorch", x: "90%", y: "70%", delay: 1.5 },
  { name: "Docker", x: "15%", y: "45%", delay: 2 },
  { name: "Git", x: "88%", y: "45%", delay: 2.5 },
];

const FloatingTechIcons = () => {
  return (
    <>
      {techIcons.map((tech) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 4, repeat: Infinity, delay: tech.delay },
            scale: { duration: 0.6, delay: 1.5 + tech.delay * 0.3 },
            y: { duration: 5, repeat: Infinity, delay: tech.delay, ease: "easeInOut" },
          }}
          className="absolute hidden md:block"
          style={{ left: tech.x, top: tech.y }}
        >
          <div className="glass-card rounded-lg border px-3 py-1.5 font-mono text-xs text-primary/70">
            {tech.name}
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default FloatingTechIcons;
