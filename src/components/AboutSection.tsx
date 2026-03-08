import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, GraduationCap, Target, Sparkles } from "lucide-react";
import { ScrollReveal, Parallax } from "./ScrollAnimations";

const aboutCards = [
  {
    icon: User,
    title: "Who I Am",
    description: "A driven CSE (AI & ML) student passionate about building intelligent systems — from semantic search platforms to smart safety monitoring solutions.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Tech in CSE (AI & ML) at CMR College of Engineering & Technology, Hyderabad with 8.42 CGPA. Previously scored 880/1000 in 10+2 MPC.",
  },
  {
    icon: Target,
    title: "Focus Areas",
    description: "AI-powered search systems, NLP, web development, real-time monitoring, and building scalable modular architectures for intelligent applications.",
  },
  {
    icon: Sparkles,
    title: "Career Goals",
    description: "Seeking internship opportunities from Jan 2026. Aspiring to work on cutting-edge AI products that solve real-world problems at scale.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// ABOUT ME"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Know <span className="gradient-text">Who I Am</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((item, i) => (
            <ScrollReveal key={item.title} delay={0.1 * (i + 1)} direction={i % 2 === 0 ? "up" : "down"}>
              <div className="glass-card hover-glow group rounded-xl border p-6 transition-all h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
