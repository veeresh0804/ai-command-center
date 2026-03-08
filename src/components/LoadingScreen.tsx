import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "INITIALIZING NEURAL CORE...",
  "LOADING AI MODULES ██████░░░░ 60%",
  "COMPILING PORTFOLIO DATA...",
  "MOUNTING 3D ENVIRONMENT...",
  "LOADING AI MODULES ████████░░ 80%",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING AI MODULES ██████████ 100%",
  "SYSTEM READY. WELCOME, USER.",
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const delay = visibleLines === bootLines.length - 1 ? 400 : 180 + Math.random() * 150;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setFadeOut(true), 600);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onComplete]);

  const progress = Math.round((visibleLines / bootLines.length) * 100);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(183_100%_50%_/_0.06)_0%,_transparent_70%)]" />

          <div className="relative z-10 w-full max-w-lg px-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="font-display text-2xl font-bold tracking-widest">
                <span className="gradient-text">VEERESH</span>
                <span className="text-muted-foreground">.SYS</span>
              </h1>
              <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </motion.div>

            {/* Terminal */}
            <div className="glass-card rounded-lg border p-4 font-mono text-xs leading-relaxed">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>boot_sequence.sh</span>
              </div>
              <div className="space-y-1">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={
                      i === bootLines.length - 1
                        ? "text-accent font-bold"
                        : line.includes("100%")
                        ? "text-accent"
                        : "text-primary/80"
                    }
                  >
                    <span className="text-muted-foreground">{">"} </span>
                    {line}
                  </motion.div>
                ))}
                {visibleLines < bootLines.length && (
                  <span className="inline-block w-1.5 h-3.5 bg-primary animate-typing-cursor" />
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between font-mono text-[10px] text-muted-foreground mb-1">
                <span>LOADING</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(183 100% 50%), hsl(263 84% 52%))" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
