import { useRef, forwardRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";

// ─── ScrollReveal ───────────────────────────────────────
interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(({ children, direction = "up", delay = 0, className = "" }, ref) => {
  const dirMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

ScrollReveal.displayName = "ScrollReveal";

// ─── Parallax ───────────────────────────────────────────
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax = ({ children, speed = 0.3, className = "" }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

// ─── ScaleOnScroll ──────────────────────────────────────
export const ScaleOnScroll = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.2]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// ─── FadeBlur ───────────────────────────────────────────
// Elements blur out as they scroll past the viewport
export const FadeBlur = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const filter = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [
    "blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"
  ]);

  return (
    <motion.div ref={ref} style={{ opacity, filter }} className={className}>
      {children}
    </motion.div>
  );
};

// ─── Stagger Container ─────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── SectionDivider ─────────────────────────────────────
export const SectionDivider = () => (
  <div className="flex items-center justify-center gap-3 py-6">
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-16 origin-right bg-gradient-to-r from-transparent to-primary/30"
    />
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="h-1.5 w-1.5 rounded-full bg-primary/50"
    />
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-16 origin-left bg-gradient-to-l from-transparent to-primary/30"
    />
  </div>
);

// ─── SectionWrapper ─────────────────────────────────────
// Wrap entire sections for consistent fade+scale on scroll
export const SectionWrapper = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className = "" }, forwardedRef) => {
    const innerRef = useRef(null);
    const targetRef = (forwardedRef as React.RefObject<HTMLDivElement>) || innerRef;
    
    const { scrollYProgress } = useScroll({
      target: innerRef,
      offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [40, 0, 0, -20]);
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0.97, 1, 1, 0.98]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 25 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 25 });

    return (
      <motion.div ref={innerRef} style={{ opacity, y: smoothY, scale: smoothScale }} className={className}>
        {children}
      </motion.div>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";
