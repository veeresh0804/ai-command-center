import { useRef } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certificationsData } from "@/data/portfolio";
import { ScrollReveal } from "./ScrollAnimations";

const CertificationsSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// CERTIFICATIONS"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Credentials & <span className="gradient-text">Certificates</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificationsData.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={0.08 * i}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="glass-card hover-glow flex items-start gap-4 rounded-xl border p-5 h-full"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold">{cert.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
