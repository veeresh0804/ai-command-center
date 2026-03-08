import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Github, Linkedin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary">{"// GET IN TOUCH"}</p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Contact <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-5 rounded-xl border p-6"
          >
            <div>
              <label className="mb-1.5 block font-mono text-xs tracking-wider text-muted-foreground">NAME</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs tracking-wider text-muted-foreground">EMAIL</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="your@email.com" />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs tracking-wider text-muted-foreground">MESSAGE</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary" placeholder="Tell me about your project..." />
            </div>
            <button type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-display text-sm font-semibold tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_30px_hsl(183_100%_50%_/_0.3)]">
              {submitted ? "SENT ✓" : (<><Send className="h-4 w-4" />SEND MESSAGE</>)}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <h3 className="mb-2 font-display text-lg font-bold">Let's Build Something Amazing</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I'm available for internship from January 2026 and always open to discussing AI projects, collaborations, or new opportunities!
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/veeresh0804", handle: "@veeresh0804" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/vennaveeresh", handle: "/in/vennaveeresh" },
                { icon: Mail, label: "Email", href: "mailto:manoharaveeresh0804@gmail.com", handle: "manoharaveeresh0804@gmail.com" },
                { icon: Phone, label: "Phone", href: "tel:+918125204479", handle: "+91 8125204479" },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="glass-card hover-glow flex items-center gap-4 rounded-xl border p-4 transition-all">
                  <social.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-display text-sm font-semibold">{social.label}</p>
                    <p className="text-xs text-muted-foreground">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
