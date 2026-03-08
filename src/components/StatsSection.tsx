import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, FolderGit2, Award, Coffee, Users, Star } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

const stats = [
  { icon: FolderGit2, label: "Projects Completed", value: 6, suffix: "+" },
  { icon: Code2, label: "Lines of Code", value: 15, suffix: "K+" },
  { icon: Award, label: "Certifications", value: 5, suffix: "" },
  { icon: Star, label: "CGPA", value: 8.42, suffix: "", decimals: 2 },
  { icon: Coffee, label: "Cups of Coffee", value: 500, suffix: "+" },
  { icon: Users, label: "GitHub Repos", value: 10, suffix: "+" },
];

function AnimatedCounter({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold md:text-4xl gradient-text">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

const StatsSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// BY THE NUMBERS"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              My <span className="gradient-text">Stats</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.08 * i}>
              <div className="glass-card hover-glow flex flex-col items-center rounded-xl border p-5 text-center transition-all">
                <stat.icon className="mb-3 h-6 w-6 text-primary" />
                <AnimatedCounter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                <span className="mt-2 text-xs font-medium text-muted-foreground">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
