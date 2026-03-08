import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Mail } from "lucide-react";
import NeuralNetwork3D from "./NeuralNetwork3D";

const roles = [
  "AI / Machine Learning Engineer",
  "Deep Learning Researcher",
  "Full-Stack Developer",
  "NLP Specialist",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(263_84%_52%_/_0.12)_0%,_transparent_70%)]" />
      <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/5 blur-[100px]" />

      {/* 3D Neural Network */}
      <NeuralNetwork3D />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 font-mono text-sm tracking-widest text-primary"
          >
            {"// WELCOME TO MY PORTFOLIO"}
          </motion.p>

          <h1 className="mb-4 font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Hi, I'm{" "}
            <span className="gradient-text">Developer</span>
            <br />
            <span className="neon-text text-primary">Name</span>
          </h1>

          <div className="mb-8 h-8 font-mono text-lg text-muted-foreground md:text-xl">
            <span>{displayText}</span>
            <span className="ml-1 inline-block w-0.5 animate-typing-cursor border-r-2 border-primary">
              &nbsp;
            </span>
          </div>

          <p className="mx-auto mb-10 max-w-2xl font-body text-lg text-muted-foreground">
            Building intelligent systems and scalable AI applications.
            Passionate about pushing the boundaries of machine learning and
            creating impactful technology.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6 text-primary/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
