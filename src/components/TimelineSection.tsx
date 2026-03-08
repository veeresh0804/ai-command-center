import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Brain, Microscope, Rocket } from "lucide-react";
import { timelineData } from "@/data/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Brain,
  Microscope,
  Rocket,
};

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// MY JOURNEY"}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Experience <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent md:left-1/2" />

          {timelineData.map((item, i) => {
            const Icon = iconMap[item.icon] || Rocket;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className={`relative mb-10 pl-16 md:w-1/2 md:pl-0 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Node */}
                <div
                  className={`absolute left-4 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background md:left-auto ${
                    isLeft ? "md:-right-[10px]" : "md:-left-[10px]"
                  }`}
                >
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                </div>

                <div className="glass-card hover-glow rounded-xl border p-5">
                  <div className={`mb-3 flex items-center gap-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-mono text-xs font-bold text-primary">{item.year}</span>
                  </div>
                  <h3 className="mb-1 font-display text-base font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
