import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, GraduationCap, Target, Sparkles } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// ABOUT ME"}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Know <span className="gradient-text">Who I Am</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: User,
              title: "Who I Am",
              description: "A passionate AI/ML engineer dedicated to building intelligent systems that solve real-world problems. I thrive at the intersection of research and application.",
            },
            {
              icon: GraduationCap,
              title: "Education",
              description: "Pursuing BTech in Artificial Intelligence and Machine Learning, with a strong foundation in mathematics, statistics, and computer science.",
            },
            {
              icon: Target,
              title: "Focus Areas",
              description: "Deep learning, natural language processing, computer vision, and scalable ML infrastructure. Always exploring cutting-edge research.",
            },
            {
              icon: Sparkles,
              title: "Career Goals",
              description: "To lead AI innovation in building products that augment human capabilities and create meaningful impact through technology.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
              className="glass-card hover-glow group rounded-xl border p-6 transition-all"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
