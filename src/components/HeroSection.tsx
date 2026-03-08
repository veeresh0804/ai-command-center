import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ExternalLink, Mail, Download } from "lucide-react";
import NeuralNetwork3D from "./NeuralNetwork3D";
import FloatingTechIcons from "./FloatingTechIcons";

const roles = [
  "AI & Machine Learning Engineer",
  "Full-Stack Developer",
  "NLP & Search Specialist",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const smoothY = useSpring(heroY, { stiffness: 60, damping: 20 });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentRole.substring(0, displayText.length - 1)
              : currentRole.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 30 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Parallax background effects */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(263_84%_52%_/_0.12)_0%,_transparent_70%)]" />
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-[100px]" />
      </motion.div>

      <NeuralNetwork3D />
      <FloatingTechIcons />

      {/* Content with scroll parallax */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: smoothY }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4 font-mono text-sm tracking-widest text-primary"
          >
            {"// WELCOME TO MY PORTFOLIO"}
          </motion.p>

          <h1 className="mb-4 font-display text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hi, I'm{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="gradient-text"
            >
              Venna Dhanush
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="neon-text text-primary"
            >
              Manohara Veeresh
            </motion.span>
          </h1>

          <div className="mb-8 h-8 font-mono text-lg text-muted-foreground md:text-xl">
            <span>{displayText}</span>
            <span className="ml-1 inline-block w-0.5 animate-typing-cursor border-r-2 border-primary">
              &nbsp;
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mx-auto mb-10 max-w-2xl font-body text-lg text-muted-foreground"
          >
            B.Tech CSE (AI & ML) student at CMR College of Engineering, Hyderabad.
            Building intelligent systems, semantic search platforms, and scalable AI applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="glass-card hover-glow flex items-center gap-2 rounded-lg border px-8 py-3 font-display text-sm font-semibold tracking-wider text-primary transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-display text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(183_100%_50%_/_0.3)]"
            >
              <Mail className="h-4 w-4" />
              CONTACT ME
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 rounded-lg border border-accent/30 px-8 py-3 font-display text-sm font-semibold tracking-wider text-accent transition-all hover:bg-accent/10"
            >
              <Download className="h-4 w-4" />
              RESUME
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6 text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
