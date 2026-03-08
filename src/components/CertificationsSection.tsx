import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import { certificationsData } from "@/data/portfolio";

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// CERTIFICATIONS"}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Credentials & <span className="gradient-text">Certificates</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificationsData.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              whileHover={{ scale: 1.03 }}
              className="glass-card hover-glow flex items-start gap-4 rounded-xl border p-5"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
