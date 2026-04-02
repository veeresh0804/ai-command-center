import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollAnimations";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Priya Sharma",
    role: "Professor, AI & ML Department",
    org: "CMR College of Engineering",
    text: "Veeresh demonstrates exceptional aptitude in machine learning and NLP. His ShodhaniAI project showed remarkable depth in semantic search — well beyond what's expected at the undergraduate level.",
    avatar: "PS",
  },
  {
    name: "Ravi Kumar",
    role: "Senior Developer",
    org: "Tech Mentorship Program",
    text: "Working with Veeresh on the eRaksha project was impressive. His ability to architect scalable AI pipelines and integrate real-time monitoring systems shows a mature engineering mindset.",
    avatar: "RK",
  },
  {
    name: "Sneha Reddy",
    role: "Project Teammate",
    org: "ArivuCode Platform",
    text: "Veeresh is an exceptional team leader. He built the entire frontend architecture from scratch and improved UI performance by 40%. His attention to code quality and user experience is outstanding.",
    avatar: "SR",
  },
  {
    name: "Karthik Nair",
    role: "Hackathon Judge",
    org: "AI Innovation Summit 2025",
    text: "The crop yield prediction model Veeresh presented was technically sound and well-engineered. His understanding of model optimization and deployment pipelines stood out among all participants.",
    avatar: "KN",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// TESTIMONIALS"}</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              What People <span className="gradient-text">Say</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card group relative rounded-xl border p-6 transition-all hover:border-primary/30"
              >
                <Quote className="absolute right-4 top-4 h-6 w-6 text-primary/10 transition-colors group-hover:text-primary/20" />
                <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-xs font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold">{t.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{t.role} · {t.org}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
