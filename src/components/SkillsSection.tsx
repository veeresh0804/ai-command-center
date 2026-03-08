import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillsData } from "@/data/portfolio";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(Object.keys(skillsData)[0]);

  const categories = Object.keys(skillsData);

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// TECHNICAL SKILLS"}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 font-display text-xs font-semibold tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(183_100%_50%_/_0.3)]"
                  : "glass-card border text-muted-foreground hover:text-primary"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto grid max-w-3xl gap-5"
        >
          {skillsData[activeCategory as keyof typeof skillsData].map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-body text-sm font-semibold">{skill.name}</span>
                <span className="font-mono text-xs text-primary">{skill.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.1 * i, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, hsl(183 100% 50%), hsl(263 84% 52%))`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
