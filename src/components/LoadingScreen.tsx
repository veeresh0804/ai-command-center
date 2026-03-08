import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
  { text: "INITIALIZING NEURAL CORE...", type: "system" },
  { text: "LOADING TENSORFLOW MODULES...", type: "module" },
  { text: "COMPILING PYTORCH BACKENDS...", type: "module" },
  { text: "NEURAL NETWORK STATUS: ██████░░░░ 60%", type: "progress" },
  { text: "MOUNTING 3D VISUALIZATION ENGINE...", type: "system" },
  { text: "LOADING DEVELOPER PROFILE: VEERESH_AI", type: "data" },
  { text: "INDEXING PROJECT DATABASE...", type: "data" },
  { text: "NEURAL NETWORK STATUS: ████████░░ 80%", type: "progress" },
  { text: "ESTABLISHING SECURE CONNECTION...", type: "system" },
  { text: "CALIBRATING ML PIPELINES...", type: "module" },
  { text: "NEURAL NETWORK STATUS: ██████████ 100%", type: "progress" },
  { text: "ALL SYSTEMS OPERATIONAL.", type: "success" },
  { text: "WELCOME TO VEERESH AI LAB.", type: "welcome" },
];

// Glitch characters for the glitch effect
const glitchChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";

const GlitchText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isActive) { setDisplay(text); return; }
    let frame = 0;
    const maxFrames = 4;
    const interval = setInterval(() => {
      if (frame >= maxFrames) { setDisplay(text); clearInterval(interval); return; }
      setDisplay(text.split("").map((c, i) =>
        Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : c
      ).join(""));
      frame++;
    }, 50);
    return () => clearInterval(interval);
  }, [text, isActive]);

  return <span>{display}</span>;
};

// Floating particles for background ambiance
const Particles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ opacity: [0, 0.8, 0], y: [0, -30, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    // Use a single interval-based approach for reliability
    let lineIndex = 0;
    const interval = setInterval(() => {
      lineIndex++;
      if (lineIndex >= bootSequence.length) {
        clearInterval(interval);
        setVisibleLines(bootSequence.length);
        setTimeout(() => setFadeOut(true), 600);
      } else {
        setVisibleLines(lineIndex);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fadeOut && !completedRef.current) {
      completedRef.current = true;
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onComplete]);

  const skipLoading = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  };

  const progress = Math.round((visibleLines / bootSequence.length) * 100);

  const getLineColor = (type: string) => {
    switch (type) {
      case "system": return "text-primary/80";
      case "module": return "text-secondary/80";
      case "progress": return "text-accent/80";
      case "data": return "text-muted-foreground";
      case "success": return "text-accent font-bold";
      case "welcome": return "text-primary font-bold text-sm";
      default: return "text-primary/80";
    }
  };

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background cursor-pointer"
          onClick={skipLoading}
        >
          {/* Ambient glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(183_100%_50%_/_0.06)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(263_84%_52%_/_0.08)_0%,_transparent_60%)]" />
          
          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-primary/20"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <Particles />

          <div className="relative z-10 w-full max-w-lg px-6">
            {/* Logo with glitch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mb-8 text-center"
            >
              <h1 className="font-display text-3xl font-bold tracking-widest">
                <span className="gradient-text">VEERESH</span>
                <span className="text-muted-foreground">.AI</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-1 font-mono text-[10px] tracking-[0.3em] text-muted-foreground"
              >
                ARTIFICIAL INTELLIGENCE LABORATORY
              </motion.p>
              <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </motion.div>

            {/* Terminal window */}
            <div className="glass-card rounded-lg border p-4 font-mono text-[11px] leading-relaxed">
              <div className="mb-3 flex items-center gap-2 border-b border-border/50 pb-2">
                <span className="h-2 w-2 rounded-full bg-destructive/60" />
                <span className="h-2 w-2 rounded-full bg-accent/60" />
                <span className="h-2 w-2 rounded-full bg-primary/60" />
                <span className="ml-2 text-[10px] text-muted-foreground">neural_boot_v2.sh</span>
              </div>
              <div className="space-y-1 max-h-48 overflow-hidden">
                {bootSequence.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={getLineColor(line.type)}
                  >
                    <span className="text-muted-foreground/60 select-none">
                      {line.type === "welcome" ? "★ " : "> "}
                    </span>
                    <GlitchText text={line.text} isActive={i === visibleLines - 1} />
                  </motion.div>
                ))}
                {visibleLines < bootSequence.length && (
                  <span className="inline-block w-1.5 h-3.5 bg-primary animate-pulse" />
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground mb-1">
                <span>SYSTEM INITIALIZATION</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {/* Sub-indicators */}
              <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground/60">
                <span>CPU: {Math.min(progress, 100)}%</span>
                <span>MEM: {Math.min(Math.round(progress * 0.8), 100)}%</span>
                <span>GPU: {Math.min(Math.round(progress * 0.6), 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
