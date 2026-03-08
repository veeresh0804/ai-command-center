import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { skillsData } from "@/data/portfolio";
import { ScrollReveal, staggerContainer, staggerItem } from "./ScrollAnimations";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(Object.keys(skillsData)[0]);

  const categories = Object.keys(skillsData);

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// TECHNICAL SKILLS"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              My <span className="gradient-text">Tech Stack</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Category tabs */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-lg px-4 py-2 font-display text-xs font-semibold tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
                    : "glass-card border text-muted-foreground hover:text-primary"
                }`}
              >
                {cat.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills grid with AnimatePresence for tab switching */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto grid max-w-3xl gap-5"
          >
            {skillsData[activeCategory as keyof typeof skillsData].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * i, ease: "easeOut" }}
                className="group"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-body text-sm font-semibold">{skill.name}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + 0.06 * i }}
                    className="font-mono text-xs text-primary"
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.25, 0.1, 0.25, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(183 100% 50%), hsl(263 84% 52%))`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;
